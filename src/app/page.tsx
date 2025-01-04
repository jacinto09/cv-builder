export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <h1 className="text-center text-2xl font-bold">
        Welcome to the CV Builder
      </h1>
      <p className="text-center">
        Create your CV in minutes with the best template from Harvard
        university.
      </p>
      <a
        href="/resumes"
        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Create your CV
      </a>
    </div>
  );
}
