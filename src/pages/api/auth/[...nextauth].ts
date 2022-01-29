import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { query as q } from "faunadb";

import { fauna } from "../../../services/fauna";


export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.CLIENT_GITHUB_ID,
      clientSecret: process.env.CLIENT_GITHUB_SECRET,
      authorization: {
        params: { scope: 'read:user' }
      }
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const { email } = user;
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(email)
                )
              )
            ),
            q.Create(
              q.Collection("users"),
              { data: { email } }
            ),

            q.Get(
              q.Match(
                q.Index("user_by_email"),
                q.Casefold(email))
            ),
          ),
        )
        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {

      try {
        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection(
              q.Match(
                q.Index("subscription_by_user_ref"),
                q.Select(
                  "ref",
                  q.Get(
                    q.Match(
                      q.Index("user_by_email"),
                      q.Casefold(session.user.email)
                    )
                  )
                )
              ),
              q.Match(
                q.Index("subscription_by_status"),
                "active"
              )
            )
          )
        )

        return {
          ...session,
          activeSubscription: userActiveSubscription
        };
      } catch {
        return {
          ...session,
          activeSubscription: null
        }
      }
    }

  }
})