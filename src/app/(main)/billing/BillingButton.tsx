"use client";
import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";
import React from "react";
function BillingButton() {
  const premiumModal = usePremiumModal();
  return (
    <Button variant="premium" onClick={() => premiumModal.setOpen(true)}>
      Upgrade
    </Button>
  );
}

export default BillingButton;
