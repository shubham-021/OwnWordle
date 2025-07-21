import clsx from "clsx"

export const Cell = ({children, correct, incorrect, includes}) => {
        return(
            <div className={clsx({
                'bg-[#538d4e]' : correct,
                'bg-[#2a2a2a]' : incorrect,
                'bg-[#b59f3b]' : includes,
                'pop-animation' : includes || incorrect || correct
               
            }, "h-13 w-13 flex justify-center  items-center text-[#ffffff] border-2 rounded-xl border-neutral-600 uppercase")}>{children}</div>
        )
}

// h-13 w-13 flex justify-center items-center border-2 border-neutral-600 uppercase
