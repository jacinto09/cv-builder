import { SubscriptionLevel } from "./subscriptions";

export function canCreateResume(
  subscriptionLeve: SubscriptionLevel,
  currentResumeCount: number,
) {
  const maxResumeMap: Record<SubscriptionLevel, number> = { free: 1, pro: 3 };

  const maxResumes = maxResumeMap[subscriptionLeve];

  return currentResumeCount < maxResumes;
}
