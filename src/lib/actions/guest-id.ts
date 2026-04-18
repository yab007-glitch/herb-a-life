"use server";

import { cookies } from "next/headers";

const GUEST_ID_COOKIE = "herbally-guest-id";

/**
 * Get or create a guest ID from cookies.
 * This allows anonymous users to have persistent chat history.
 */
export async function getGuestId(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get(GUEST_ID_COOKIE);

  if (existing?.value) {
    return existing.value;
  }

  // Generate a new guest ID
  const guestId = crypto.randomUUID();

  // We can't set cookies from server actions in all cases,
  // so return it and let the client set it
  return guestId;
}

/**
 * Set the guest ID cookie (called from client after first chat)
 */
export async function setGuestId(guestId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(GUEST_ID_COOKIE, guestId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  });
}