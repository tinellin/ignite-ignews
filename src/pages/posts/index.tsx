import { GetStaticProps } from 'next';
import Head from 'next/head';
import styles from './styles.module.scss';

import Prismic from '@prismicio/client';

import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../services/prismic';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

type PostsProps = {
  posts: Post[];
};

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Ignews | Posts</title>
      </Head>

      <main className={styles.postsWrapper}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <a href="" key={post.slug}>
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const res = await prismic.query<any>(
    [Prismic.Predicates.at('document.type', 'posts')],
    { fetch: ['posts.title', 'posts.content'], pageSize: 5 }
  );

  const posts = res.results.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find((content) => content.type === 'paragraph')
          ?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'en-US',
        {
          month: 'long',
          day: '2-digit',
          year: 'numeric',
        }
      ),
    };
  });

  return {
    props: { posts },
  };
};
