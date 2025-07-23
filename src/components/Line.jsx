import { motion } from "motion/react"
import { Cell } from "./Cell"

export const Line = ({guess , solution , isFinal , isCurrent , shouldAnimate , animationKey}) => {

    // const finalAnimationProps = isFinal
    //     ? {
    //         // animate: shouldAnimate ? { x: [-50, 0, 50, 0] } : { x: 0 },
    //         backgroundColor: shouldAnimate ? "#f87171" : "#4ade80",
    //         transition: { duration: 0.5 },
    //         }
    //     : {};

    const cells = []
    for(let i=0; i<5; i++){
        const letter = guess[i]
        cells.push(<Cell key={i} 
                         {...(
                            isFinal && {
                                correct : solution[i]==letter,
                                includes : solution[i] != letter && solution.includes(letter),
                                incorrect : solution[i] != letter && !solution.includes(letter)
                            }
                         )}>{letter}</Cell>)
    }

    return(
        <motion.div
            className="h-9 lg:h-12 flex gap-1"
            key={animationKey}
            animate={
                isCurrent && shouldAnimate 
                ? { x: [0, -20, 20, -20, 0] } 
                : { x: 0 }
            }
            transition={{ duration: 0.3 }}
        >
            {cells}
        </motion.div>
    )
}