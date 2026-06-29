import { apiFetch } from "../lib/api";
import { RedeemCouponResponseSchema, RedeemCouponResponse } from "../schemas";

export const couponService = {
  validateCoupon: async (code: string, token: string): Promise<RedeemCouponResponse> => {
    const res = await apiFetch<RedeemCouponResponse>(
      "/coupons/validate",
      {
        method: "POST",
        body: JSON.stringify({ code }),
      },
      token
    );
    return RedeemCouponResponseSchema.parse(res);
  },
};
