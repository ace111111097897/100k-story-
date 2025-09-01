import { query } from "./_generated/server.js";
import { getAuthUserId } from "@convex-dev/auth/server";
import { QueryCtx } from "./_generated/server";

export const me = query({
  handler: async (ctx: QueryCtx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});
