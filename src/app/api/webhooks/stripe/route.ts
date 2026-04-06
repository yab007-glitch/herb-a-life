import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Lazy-initialize Stripe to avoid build-time errors when STRIPE_SECRET_KEY is not set
let stripe: Stripe | null = null;

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return null;
  }
  if (!stripe) {
    stripe = new Stripe(key, {
      apiVersion: "2024-12-18.acacia",
    });
  }
  return stripe;
}

// This is a placeholder for donation tracking
// In production, you would store this in a database
const donationLog: Array<{
  id: string;
  amount: number;
  email: string | null;
  status: string;
  createdAt: Date;
}> = [];

export async function POST(request: NextRequest) {
  const stripeClient = getStripe();

  if (!stripeClient) {
    console.error("STRIPE_SECRET_KEY is not configured");
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 500 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripeClient.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        // Extract donation details
        const donationId = session.id;
        const amount = session.amount_total || 0;
        const email = session.customer_details?.email || null;
        const paymentIntentId = session.payment_intent as string | null;

        // Log the donation (replace with database insert)
        console.log("Donation received:", {
          id: donationId,
          amount: amount / 100, // Convert from cents
          email,
          paymentIntentId,
        });

        // Store in memory for now (replace with database)
        donationLog.push({
          id: donationId,
          amount: amount / 100,
          email,
          status: "completed",
          createdAt: new Date(),
        });

        // In production, you would:
        // 1. Insert into donations table
        // 2. Send thank you email
        // 3. Update analytics

        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Checkout expired:", session.id);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment failed:", paymentIntent.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Error processing webhook:", err);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to view recent donations (admin only in production)
export async function GET() {
  // In production, add authentication here
  return NextResponse.json({
    donations: donationLog.slice(-10),
    total: donationLog.reduce((sum, d) => sum + d.amount, 0),
  });
}