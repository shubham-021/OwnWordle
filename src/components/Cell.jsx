import clsx from "clsx"

export const Cell = ({children, correct, incorrect, includes}) => {
        return(
            <div className={clsx({
                'bg-green-400' : correct,
                'bg-neutral-400' : incorrect,
                'bg-yellow-500' : includes
            }, "h-13 w-13 flex justify-center items-center border-2 border-neutral-600 uppercase")}>{children}</div>
        )
}

// h-13 w-13 flex justify-center items-center border-2 border-neutral-600 uppercase
