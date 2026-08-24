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

export function getBaseUrl(request?: Request) {
  if (request) return new URL(request.url).origin;

  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();

  if (configuredUrl) {
    try {
      return new URL(configuredUrl).origin;
    } catch {
      throw new Error("NEXT_PUBLIC_APP_URL is not a valid URL");
    }
  }

  return "http://localhost:3000";
}

export function isSameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}
