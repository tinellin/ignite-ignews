import styles from './styles.module.scss';
import { signIn, useSession } from 'next-auth/react';
import { api } from '../../services/api';
import { getStripeFront } from '../../services/stripe-front';

export function SubscribeButton() {
  const { data: session } = useSession();

  async function handleSubscribe() {
    if (!session) {
      signIn('github');
      return;
    }

    try {
      const res = await api.post('/subscribe');
      const { sessionId } = res.data;

      const stripe = await getStripeFront();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}
