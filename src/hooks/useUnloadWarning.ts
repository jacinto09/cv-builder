import { useEffect } from "react";

function useUnloadWarning(condition = true) {
  useEffect(() => {
    if (!condition) {
      return;
    }
    const listener = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", listener);
    return () => window.removeEventListener("beforeunload", listener);
  }, [condition]);
}

export default useUnloadWarning;
