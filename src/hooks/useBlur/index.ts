import { useEffect, useRef } from "react";

const useBlur = (handleBlur: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.addEventListener("mouseup", function (e: MouseEvent) {
      if (!ref.current) return;
      if (e.target instanceof HTMLElement && !ref.current.contains(e.target)) {
        handleBlur();
      }
    });
  }, []);
  return ref;
};

export default useBlur;