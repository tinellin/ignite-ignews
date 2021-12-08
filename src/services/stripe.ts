import Stripe from "stripe";
import pkg from "../../package.json";

const { name, version } = pkg;

export const stripe = new Stripe(
  process.env.STRIPE_API_KEY,
  {
    apiVersion: "2020-08-27",
    appInfo: { name, version }
  }
);