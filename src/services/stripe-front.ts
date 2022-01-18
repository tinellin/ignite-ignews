import { loadStripe } from "@stripe/stripe-js";

export async function getStripeFront() {
  const stripeFront = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

  return stripeFront;
}