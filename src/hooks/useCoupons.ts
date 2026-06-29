import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { couponService } from "../services/coupon.service";

export function useValidateCoupon() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken;

  return useMutation({
    mutationFn: (code: string) => {
      if (!token) {
        throw new Error("No estás autenticado. Inicie sesión nuevamente.");
      }
      return couponService.validateCoupon(code, token);
    },
    onSuccess: () => {
      // Invalidate dashboard metrics/stats/rewards queries so they get updated
      queryClient.invalidateQueries({ queryKey: ["dashboard-metrics"] });
      queryClient.invalidateQueries({ queryKey: ["active-rewards"] });
    },
  });
}
