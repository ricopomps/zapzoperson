import { env } from "@/env";
import { clerkClient } from "@clerk/nextjs/server";
import { SessionWebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();

    const wh = new Webhook(env.CLERK_WEBHOOK_KEY);

    try {
      wh.verify(rawBody, {
        "svix-id": req.headers.get("svix-id") || "",
        "svix-signature": req.headers.get("svix-signature") || "",
        "svix-timestamp": req.headers.get("svix-timestamp") || "",
      });
    } catch (error) {
      return NextResponse.json(
        { error: "Webhook signature invalid" },
        { status: 401 }
      );
    }

    const event: SessionWebhookEvent = JSON.parse(rawBody);

    console.log("Clerk webhook body: ", event);

    if (
      event.type === "session.ended" ||
      event.type === "session.removed" ||
      event.type === "session.revoked"
    ) {
      const { user_id: userId, id: sessionId } = event.data;

      const user = await clerkClient.users.getUser(userId);

      const userSubscriptions = user.privateMetadata.subscriptions || [];

      const updatedSubscriptions = userSubscriptions.filter(
        (subscription) => subscription.sessionId !== sessionId
      );

      await clerkClient.users.updateUser(userId, {
        privateMetadata: {
          subscriptions: updatedSubscriptions,
        },
      });
    }
    return NextResponse.json({ sucess: "true" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
