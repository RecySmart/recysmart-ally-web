import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { rewardService } from "../services/reward.service";
import type { CreateRewardFormData, Reward } from "../schemas";

export function useCompanyRewards(page: number | "all" = 1, limit = 20) {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const partnerUserId = session?.user?.id;

  return useQuery({
    queryKey: ["active-rewards", partnerUserId, page, limit],
    queryFn: async () => {
      if (!token) {
        throw new Error("No token provided");
      }
      if (page !== "all") return rewardService.getMyRewards(token, page, limit);

      const pageSize = 100;
      const rewards = new Map<string, Reward>();
      for (let current = 1; ; current++) {
        const batch = await rewardService.getMyRewards(token, current, pageSize);
        for (const reward of batch) rewards.set(reward.id, reward);
        if (batch.length < pageSize) return [...rewards.values()];
      }
    },
    enabled: !!token && !!partnerUserId,
  });
}

export function useCreateReward() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const token = session?.accessToken;

  return useMutation({
    mutationFn: (data: CreateRewardFormData) => {
      if (!token) {
        throw new Error("No estás autenticado. Inicie sesión nuevamente.");
      }
      return rewardService.createReward(data, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["active-rewards"] });
    },
  });
}

export function useUpdateReward() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      rewardId,
      data,
    }: {
      rewardId: string;
      data: CreateRewardFormData;
    }) => {
      if (!session?.accessToken) throw new Error("No estás autenticado.");
      const editable = {
        title: data.title,
        description: data.description,
        costInPoints: data.costInPoints,
        expiresAt: data.expiresAt,
      };
      return rewardService.updateReward(
        rewardId,
        editable,
        session.accessToken,
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["active-rewards"] }),
  });
}

export function useSetRewardStatus() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      rewardId,
      status,
    }: {
      rewardId: string;
      status: "ACTIVE" | "DISCONTINUED";
    }) => {
      if (!session?.accessToken) throw new Error("No estás autenticado.");
      return rewardService.setStatus(rewardId, status, session.accessToken);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["active-rewards"] }),
  });
}

export function useAddRewardStock() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      rewardId,
      amount,
    }: {
      rewardId: string;
      amount: number;
    }) => {
      if (!session?.accessToken) throw new Error("No estás autenticado.");
      return rewardService.addStock(rewardId, amount, session.accessToken);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["active-rewards"] }),
  });
}
