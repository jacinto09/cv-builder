import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getUserSubscriptionLevel } from "@/lib/subscriptions";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import BillingButton from "./BillingButton";
import { Check } from "lucide-react";
async function Page() {
  const features = ["AI tools", "Up to 3 resumes"];
  const { userId } = await auth();

  if (!userId) return <h1>You are not logged in</h1>;
  const susbscriptionLevel = await getUserSubscriptionLevel(userId);

  return (
    <main className="flex w-full items-center justify-center space-y-6 px-3 py-6">
      <Card className="max-w-2xl">
        <CardHeader>
          <h1>Your account is: {susbscriptionLevel}</h1>
        </CardHeader>
        <CardContent className="flex items-center justify-center gap-3">
          {susbscriptionLevel === "free" ? (
            <div className="space-y-6">
              <p>Get a premium subscription to unlock all features.</p>
              <div className="flex">
                <div className="flex w-full flex-col space-y-5">
                  <div className="bg-gradient-to-r from-green-500 to-green-400 p-[0.3px]" />
                  <div className="flex w-full items-baseline justify-between space-y-2">
                    {features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center justify-center gap-2"
                      >
                        <Check className="size-4 text-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <BillingButton />
            </div>
          ) : (
            <h1>You are already a pro!</h1>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

export default Page;
