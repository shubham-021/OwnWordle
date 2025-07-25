import { motion } from "motion/react";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

export const Cell = React.memo(({ children, correct, incorrect, includes, isFinal }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const triggeredOnce = useRef(false);
  // console.log(isFinal)
  // console.log('TriggeredOnce -> ', triggeredOnce.current)


  useEffect(() => {
    if (isFinal && !triggeredOnce.current) {
      // console.log(isFinal)
      setHasAnimated(true);
      triggeredOnce.current = true;
    }
  }, [isFinal]);
  // console.log("Cell ->")

  return (
    <motion.div
    initial={{scale : 1}}
      animate={hasAnimated ? {scale : [0.8 , 1.1 , 1]} : {scale : 1}}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={clsx(
        {
          "bg-[#538d4e]": correct,
          "bg-[#2a2a2a]": incorrect,
          "bg-[#b59f3b]": includes
        },
        "h-9 w-9 lg:h-13 lg:w-13 flex justify-center items-center text-neutral-200 border-2 rounded-md sm:rounded-xl border-neutral-600 uppercase"
      )}
    >
      {children}
    </motion.div>
  );
});

