import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export const Cell = ({ children, correct, incorrect, includes, isFinal }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const triggeredOnce = useRef(false);

  useEffect(() => {
    if (isFinal && !triggeredOnce.current) {
      setHasAnimated(true);
      triggeredOnce.current = true;
    }
  }, [isFinal]);

  return (
    <div
      className={clsx(
        {
          "bg-[#538d4e]": correct,
          "bg-[#2a2a2a]": incorrect,
          "bg-[#b59f3b]": includes,
          "pop-animation": correct || incorrect || includes,
        },
        "h-9 w-9 lg:h-13 lg:w-13 flex justify-center items-center text-neutral-200 border-2 rounded-md sm:rounded-xl border-neutral-600 uppercase"
      )}
    >
      {children}
    </div>
  );
};
