"use client";
import Footer from "./Footer";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "./Breadcrumbs";
import { ResumeValues } from "@/lib/validation";
import ResumePreviewerSection from "./ResumePreviewerSection";
import { cn } from "@/lib/utils";
import useAutoSaveResume from "./useAutoSaveResume";
import useUnloadWarning from "@/hooks/useUnloadWarning";

function ResumeEditor() {
  const searchParams = useSearchParams();

  const [resumeData, setResumeData] = useState<ResumeValues>({});
  const [showResumePreview, setShowResumePreview] = useState(false);

  const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData);

  useUnloadWarning(hasUnsavedChanges);

  const currentStep = searchParams.get("step") || steps[0].key;

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;

  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Create a new resume</h1>
        <p className="text-sm text-muted-foreground">
          Follow the steps to create your resume.
        </p>
      </header>
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div
            className={cn(
              "w-full space-y-3 overflow-y-auto p-3 md:block md:w-1/2",
              showResumePreview && "hidden",
            )}
          >
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow md:border-r" />
          <ResumePreviewerSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            className={cn(showResumePreview && "flex")}
          />
        </div>
      </main>
      <Footer
        isSaving={isSaving}
        showResumePreview={showResumePreview}
        setShowResumePreview={setShowResumePreview}
        currentStep={currentStep}
        setCurrentStep={setStep}
      />
    </div>
  );
}
export default ResumeEditor;
