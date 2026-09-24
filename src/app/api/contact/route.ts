import { NextResponse } from "next/server";

function getText(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Submit the enquiry as form data." },
      { status: 400 },
    );
  }

  const name = getText(formData.get("name"));
  const email = getText(formData.get("email"));
  const phone = getText(formData.get("phone"));
  const eventDate = getText(formData.get("eventDate"));
  const message = getText(formData.get("message"));
  const website = getText(formData.get("website"));

  // Silently accept bot submissions so the honeypot is not revealed.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email address, and message are required." },
      { status: 422 },
    );
  }

  if (
    name.length > 120 ||
    email.length > 254 ||
    phone.length > 40 ||
    eventDate.length > 10 ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { ok: false, error: "One or more fields are too long." },
      { status: 422 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email address." },
      { status: 422 },
    );
  }

  if (eventDate && !/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid event date." },
      { status: 422 },
    );
  }

  const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;

  if (!formspreeEndpoint) {
    return NextResponse.json(
      { ok: false, error: "Contact delivery is not configured." },
      { status: 503 },
    );
  }

  let endpoint: URL;

  try {
    endpoint = new URL(formspreeEndpoint);
    const isFormspreeHost =
      endpoint.hostname === "formspree.io" || endpoint.hostname.endsWith(".formspree.io");

    if (endpoint.protocol !== "https:" || !isFormspreeHost) {
      throw new Error("Invalid Formspree endpoint");
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: "Contact delivery is not configured." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, eventDate, message }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: "The message could not be delivered. Please try again." },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: "The message could not be delivered. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
