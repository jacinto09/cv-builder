import { SubscriptionLevel } from "./subscriptions";

export function canCreateResume(
  subscriptionLevel: SubscriptionLevel,
  currentResumeCount: number,
) {
  const maxResumeMap: Record<SubscriptionLevel, number> = { free: 1, pro: 3 };

  const maxResumes = maxResumeMap[subscriptionLevel];

  return currentResumeCount < maxResumes;
}

export function canUseAI(subscriptionLevel: SubscriptionLevel) {
  const canAIMap: Record<SubscriptionLevel, boolean> = {
    free: false,
    pro: true,
  };

  const canAI = canAIMap[subscriptionLevel];

  return canAI;
}
