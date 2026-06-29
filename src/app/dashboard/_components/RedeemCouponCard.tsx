"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ticket } from "lucide-react";
import { toast } from "sonner";
import { RedeemCouponSchema, RedeemCouponFormData } from "@/schemas";
import { useValidateCoupon } from "@/hooks/useCoupons";
import { RedeemCouponForm } from "@/components/dashboard/RedeemCouponForm";
import { ApiError } from "@/utils";

export function RedeemCouponCard() {
  const form = useForm<RedeemCouponFormData>({
    resolver: zodResolver(RedeemCouponSchema),
    defaultValues: {
      code: "",
    },
  });

  const validateCoupon = useValidateCoupon();

  const onSubmit = (data: RedeemCouponFormData) => {
    validateCoupon.mutate(data.code, {
      onSuccess: (res) => {
        toast.success("¡Recompensa Canjeada!", {
          description: `El código ${res.couponCode} (${res.rewardTitle}) para ${res.clientName} se ha procesado exitosamente.`,
        });
        form.reset();
      },
      onError: (error) => {
        if (error instanceof ApiError) {
          error.messages.forEach((msg) => toast.error(msg));
        } else {
          toast.error(error.message || "Error al validar el cupón");
        }
      },
    });
  };

  return (
    <div className="bg-card border border-border rounded-2xl shadow-xs relative overflow-hidden flex flex-col items-center justify-center p-8 md:p-12 text-center space-y-6 pt-16">
      {/* Green accent line at the top */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-green"></div>

      {/* Clean circle placeholder */}
      <div className="w-20 h-20 bg-canvas-base border border-border rounded-full flex items-center justify-center shadow-inner">
        <Ticket className="text-gray-400 dark:text-gray-500 w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-text-primary">Canjear Recompensa</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
          Pídele al cliente que muestre el código QR en su celular o ingresa el código manual.
        </p>
      </div>

      {/* Form wrapper passing handles down */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex justify-center">
        <RedeemCouponForm form={form} isLoading={validateCoupon.isPending} />
      </form>
    </div>
  );
}
