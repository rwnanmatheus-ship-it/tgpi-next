import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripeServer() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }

  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }

  return stripeClient;
}

export const TGPI_PREMIUM_PRICE_ID =
  process.env.STRIPE_PRICE_ID_PREMIUM || "";

export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}