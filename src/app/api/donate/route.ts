import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();

    // Validate amount (min $1, max $1000)
    const donationAmount = Math.max(100, Math.min(100000, Number(amount) || 1000)); // in cents

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Support 1Herb",
              description: "Help keep herbal medicine information free for everyone",
              images: ["https://1herb.app/leaf-icon.png"],
            },
            unit_amount: donationAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://1herb.app"}/donate?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://1herb.app"}/donate?canceled=true`,
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