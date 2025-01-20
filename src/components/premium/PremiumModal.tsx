"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";
import createCheckoutSession from "./action";
import { useToast } from "@/hooks/use-toast";
import { env } from "@/env";
const features = ["AI tools", "Up to 3 resumes", "Design customizations"];

function PremiumModal() {
  const { open, setOpen } = usePremiumModal();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  async function handlePremiumClick(priceId: string) {
    try {
      setLoading(true);
      const redirectUrl = await createCheckoutSession(priceId);
      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);

      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again later",
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!loading) {
          setOpen(open);
        }
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>CV Builder AI Premium</DialogTitle>
        </DialogHeader>
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
          <div className="bg-gradient-to-r from-green-500 to-green-400 p-[0.5px]" />
          <Button
            variant={"premium"}
            disabled={loading}
            onClick={() =>
              handlePremiumClick(env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY)
            }
          >
            Get Premium
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PremiumModal;
