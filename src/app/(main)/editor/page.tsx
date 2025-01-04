import React from "react";
import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";
export const metadata: Metadata = {
  title: "Create a new resume",
};

function Page() {
  return <ResumeEditor />;
}

export default Page;
