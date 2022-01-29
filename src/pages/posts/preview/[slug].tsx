import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../../services/prismic';

import styles from '.././post.module.scss';

type PostPreviewProps = {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
};

export default function PostPreview({ post }: PostPreviewProps) {
  const session = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (session.data?.activeSubscription) {
      push(`/posts/${post.slug}`);
      return;
    }
  }, [session]);

  return (
    <>
      <Head>{post.slug} | Ig.news</Head>

      <main className={styles.postWrapper}>
        <article className={styles.post}>
          <span>uuid: {post.slug}</span>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>

          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.continueReading}>
            Wanna continue reading?{' '}
            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();
  const res = await prismic.getByUID<any>('posts', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(res.data.title),
    content: RichText.asHtml(res.data.content.splice(0, 3)),
    updatedAt: new Date(res.last_publication_date).toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    }),
  };

  return {
    props: { post },
    revalidate: 60 * 60, //1 hour
  };
};
