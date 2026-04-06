import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Validate Stripe key is configured
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey && process.env.NODE_ENV === "production") {
  console.error("STRIPE_SECRET_KEY is not configured");
}

const stripe = stripeSecretKey 
  ? new Stripe(stripeSecretKey, { apiVersion: "2024-12-18.acacia" })
  : null;

export async function POST(req: NextRequest) {
  // Check if Stripe is configured
  if (!stripe) {
    return NextResponse.json(
      { error: "Donations are not currently available. Please try again later." },
      { status: 503 }
    );
  }

  try {
    const { amount } = await req.json();

    // Validate amount (min $1, max $1000)
    const donationAmount = Math.max(100, Math.min(100000, Number(amount) || 1000)); // in cents

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://herbwise.app";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Support HerbWise",
              description: "Help keep herbal medicine information free for everyone",
              // Remove images field - Stripe requires publicly accessible URLs
              // If you want an image, upload to public/ and use appUrl + "/leaf-icon.png"
            },
            unit_amount: donationAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${appUrl}/donate?success=true`,
      cancel_url: `${appUrl}/donate?canceled=true`,
      metadata: {
        type: "donation",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}