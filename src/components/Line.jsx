import React, { useContext, useEffect } from "react"
import { motion, useAnimation } from "motion/react"
import { Cell } from "./Cell"
import { solutionContext } from "../context/solution"

export const Line = ({guess , isFinal , isCurrent , shouldAnimate , animationKey}) => {

    // const finalAnimationProps = isFinal
    //     ? {
    //         // animate: shouldAnimate ? { x: [-50, 0, 50, 0] } : { x: 0 },
    //         backgroundColor: shouldAnimate ? "#f87171" : "#4ade80",
    //         transition: { duration: 0.5 },
    //         }
    //     : {};
    const {solution} = useContext(solutionContext)
    // console.log(solution)
    const controls = useAnimation()

    useEffect(() => {
        if (isCurrent && shouldAnimate) {
            controls.start({
                x: [0, -20, 20, -20, 0],
                transition: { duration: 0.3 }
            })
        }
    }, [shouldAnimate, isCurrent, controls , animationKey])

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
                         )}
                         isFinal={isFinal}
                         >{letter}</Cell>)
    }
    // console.log("Line ->")
    // console.log("animationKey -> " , animationKey)
    // console.log("shouldAnimate -> " , shouldAnimate)
    // console.log("isCurrent -> " , isCurrent)
    // useEffect(() => {
    //     console.log("animationKey changed →", animationKey);
    // }, [animationKey]);

    return(
        <motion.div
            className="h-9 lg:h-12 flex gap-1"
            animate={controls}
        >
            {cells}
        </motion.div>
    )
}