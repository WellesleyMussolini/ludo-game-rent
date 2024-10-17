import { NextResponse } from "next/server";

const accountSid = process.env.NEXT_TWILIO_ACCOUNT_SID;
const authToken = process.env.NEXT_TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

export async function POST(request: any) {
  const { message } = await request.json();
  try {
    client.messages.create({
      body: message,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+553184140779",
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
