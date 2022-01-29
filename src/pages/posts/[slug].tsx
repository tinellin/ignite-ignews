import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';

import styles from './post.module.scss';

type PostProps = {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
};

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>{post.slug} | Ig.news</Head>

      <main className={styles.postWrapper}>
        <article className={styles.post}>
          <span>uuid: {post.slug}</span>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>

          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className={styles.postContent}
          />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });
  const { slug } = params;

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const prismic = getPrismicClient(req);

  const res = await prismic.getByUID<any>('posts', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(res.data.title),
    content: RichText.asHtml(res.data.content),
    updatedAt: new Date(res.last_publication_date).toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    }),
  };

  return {
    props: { post },
  };
};
