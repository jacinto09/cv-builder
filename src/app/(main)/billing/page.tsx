import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getUserSubscriptionLevel } from "@/lib/subscriptions";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import BillingButton from "./BillingButton";
async function Page() {
  const { userId } = await auth();
  console.log(userId);

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
            <BillingButton />
          ) : (
            <h1>You are already a pro</h1>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

export default Page;
