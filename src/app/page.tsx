import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import resumePreviewExample from "@/assets/resumePreviewExample.png";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100 px-10 py-12 text-center text-gray-900 md:text-start lg:flex-row lg:gap-12">
      <div className="flex max-w-prose flex-col items-center space-y-3">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Create the{" "}
          <span className="inline-block bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Perfect Resume
          </span>{" "}
          in minutes.
        </h1>
        <p className="text-lg text-gray-500">
          Our <span className="font-bold">AI resume builder </span>
          helps you design a professional resume and get the job you always
          wanted.
        </p>
        <Button asChild size="lg" variant="premium" className="mx-auto">
          <Link href="/resumes">Get Started</Link>
        </Button>
      </div>
      <div>
        <Image
          src={resumePreviewExample}
          alt="Resume Preview"
          width={600}
          height={800}
          draggable={false}
          className="shadow-md lg:rotate-[1.5deg]"
        />
      </div>
    </main>
  );
}
