import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { steps } from "./steps";
import { FileUserIcon, PenLineIcon } from "lucide-react";
interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showResumePreview: boolean;
  setShowResumePreview: (show: boolean) => void;
}

function Footer({
  currentStep,
  setCurrentStep,
  showResumePreview,
  setShowResumePreview,
}: FooterProps) {
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep,
  );
  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep,
  );
  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={
              previousStep ? () => setCurrentStep(previousStep.key) : undefined
            }
            disabled={!previousStep}
          >
            Previous Step
          </Button>
          <Button
            onClick={nextStep ? () => setCurrentStep(nextStep.key) : undefined}
            disabled={!nextStep}
          >
            Next Step
          </Button>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowResumePreview(!showResumePreview)}
          className="md:hidden"
          title={showResumePreview ? "Show input form" : "Show resume preview"}
        >
          {showResumePreview ? <PenLineIcon /> : <FileUserIcon />}
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="secondary" asChild>
            <Link href="/resumes">Close</Link>
          </Button>
          <p className="text-muted-foreground opacity-0">Saving...</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
