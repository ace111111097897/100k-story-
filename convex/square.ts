"use node";
import { v } from "convex/values";
import { internal } from "./_generated/api.js";
import { action, internalAction } from "./_generated/server.js";
import pkg from "square";
const { Client, Environment } = pkg;
import { Id } from "./_generated/dataModel.js";

if (
  !process.env.SQUARE_ACCESS_TOKEN ||
  !process.env.SQUARE_LOCATION_ID ||
  !process.env.SQUARE_WEBHOOK_SIGNATURE_KEY
) {
  console.warn(
    "SQUARE environment variables not set. Square integration will not work."
  );
}

const client = new Client({
  environment: Environment.Sandbox, // or Environment.Production
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
});

export const createCheckout = action({
  args: {
    tier: v.string(),
    redirectUrl: v.string(),
    userId: v.id("users"),
  },
  handler: async (_: any, { tier, redirectUrl, userId }: { tier: string, redirectUrl: string, userId: Id<"users"> }) => {
    if (!process.env.SQUARE_ACCESS_TOKEN || !process.env.SQUARE_LOCATION_ID) {
      throw new Error("Square environment variables not set.");
    }
    const { locationsApi, checkoutApi } = client;

    const locationResponse = await locationsApi.retrieveLocation(
      process.env.SQUARE_LOCATION_ID!
    );
    const currency = locationResponse.result.location?.currency;

    let price;
    if (tier === "Starter") {
      price = 19700;
    } else if (tier === "Pro") {
      price = 49700;
    } else if (tier === "Elite") {
      price = 149700;
    } else {
      throw new Error("Invalid tier");
    }

    const response = await checkoutApi.createCheckout(
      process.env.SQUARE_LOCATION_ID!,
      {
        idempotencyKey: crypto.randomUUID(),
        order: {
          idempotencyKey: crypto.randomUUID(),
          order: {
            locationId: process.env.SQUARE_LOCATION_ID!,
            lineItems: [
              {
                name: `Quantum Course - ${tier}`,
                quantity: "1",
                basePriceMoney: {
                  amount: BigInt(price),
                  currency: currency!,
                },
              },
            ],
            metadata: {
              userId: userId,
            },
          },
        },
        redirectUrl,
      }
    );

    return response.result.checkout?.checkoutPageUrl;
  },
});

export const handleWebhook = internalAction({
  args: {
    requestBody: v.string(),
    signature: v.string(),
  },
  handler: async (ctx: any, { requestBody, signature }: { requestBody: string, signature: string }) => {
    if (!process.env.SQUARE_WEBHOOK_SIGNATURE_KEY) {
      throw new Error("Square webhook signature key not set.");
    }
    if (
      !client.webhook.verify(
        requestBody,
        signature,
        process.env.SQUARE_WEBHOOK_SIGNATURE_KEY!
      )
    ) {
      throw new Error("Webhook signature verification failed");
    }

    const event = JSON.parse(requestBody);
    if (event.type === "payment.updated") {
      const payment = event.data.object.payment;
      if (payment.status === "COMPLETED") {
        const orderId = payment.order_id;
        const { ordersApi } = client;
        const order = await ordersApi.retrieveOrder(orderId);
        const tier = order.result.order?.lineItems?.[0].name?.replace(
          "Quantum Course - ",
          ""
        );
        const squarePurchaseId = payment.id;
        const userId = order.result.order?.metadata?.userId as Id<"users">;

        if (tier && squarePurchaseId && userId) {
          await ctx.runMutation(internal.users.addPurchase, {
            tier,
            squarePurchaseId,
            userId,
          });
        }
      }
    }
  },
});
