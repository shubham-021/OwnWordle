import { fiveLetterWords } from "../words/validwords";
import { solutionContext } from "./solution";
import { useEffect, useState } from "react";

export const SolutionContextProvider = ({children}) => {
    const[solution , setSolution] = useState("")
    useEffect(()=>{
        const fetchWord = ()=>{
            // console.log(fiveLetterWords.length)
            const index = Math.floor(Math.random()*2309)
            const word = fiveLetterWords[index]
            setSolution(word)
        }

        fetchWord()
    },[])
    return(
        <solutionContext.Provider value={{solution}}>
            {children}
        </solutionContext.Provider>
    )
}