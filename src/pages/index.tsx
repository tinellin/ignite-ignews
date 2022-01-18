import Head from 'next/head';
import { GetStaticProps } from 'next';

import styles from './home.module.scss';

import { SubscribeButton } from '../components/SubscribeButton';

import { stripe } from '../services/stripe';

type HomeProps = {
  product: {
    priceId: string;
    amount: number;
  };
};

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home : ig.news</title>
      </Head>

      <main className={styles.contentWrapper}>
        <section className={styles.hero}>
          <span>
            <div>👏</div> Hey, welcome
          </span>
          <h1>
            News about the <span>React</span> world
          </h1>
          <p>
            Get acess to all the publications for{' '}
            <span>{product.amount} month</span>
          </p>
          <SubscribeButton />
        </section>
        <img src="./images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  //Faz a atualização do preço

  const price = await stripe.prices.retrieve('price_1K4VHVDUN3NptVEZPWBRxNDf');

  const product = {
    priceId: price.id,
    amount: Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return {
    props: { product },
    revalidate: 60 * 60 * 24, //24 hours
  };
};
