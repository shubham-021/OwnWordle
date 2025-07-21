import { useCallback, useEffect, useRef, useState } from "react"
import { Line } from "./Line"

export const Board = () => {

    const isLetter = useCallback((char)=>{
        const code = char.charCodeAt(0);
        return (code >= 65 && code <= 90) || (code >= 97 && code <= 122)
    } , [])

    const [solution , setSolution] = useState('')
    const[guesses , setGuesses] = useState(new Array(6).fill(null))
    const[currentGuess , setCurrentGuess] = useState('')
    const [isGameOver , setIsGameOver] = useState(false)

    useEffect(()=>{
        const handleKey = (e) => {

            if(isGameOver){
                return
            }

            if(e.key == "Backspace"){
                // console.log("pressed")
                return setCurrentGuess(currentGuess.slice(0,-1))
            }

            if(e.key === "Enter"){
                if(currentGuess.length != 5){
                    return
                }
                const newGuesses = [...guesses]
                newGuesses[guesses.findIndex((val)=> val==null)] = currentGuess
                setGuesses(newGuesses)
                setCurrentGuess('')
                const isCorrect = solution === currentGuess
                if(isCorrect){
                    setIsGameOver(true)
                }
            }

            if (currentGuess.length < 5 && isLetter(e.key)) {
                // console.log(e.key)
                setCurrentGuess(prev => prev + e.key);
            }
            
        }
        window.addEventListener('keydown' , handleKey)

        return ()=>{window.removeEventListener('keydown' , handleKey)}
    },[currentGuess , isGameOver , solution])
    
    useEffect(()=>{
        const fetchWord = async()=>{
            const res = await fetch("https://cfwordleserver.shubhamthesingh21.workers.dev/allwords")
            const finalRes = await res.json()
            const word = finalRes.allwords[Math.floor(Math.random()*finalRes.allwords.length)]
            // console.log(word)
            setSolution(word)
        }

        fetchWord()
    },[])

    return(
        <div className="h-93 w-80 flex flex-col gap-4">
            {
                guesses.map((guess , i)=>{
                    const isCurrentGuess = i === guesses.findIndex(val => val == null)
                    return <Line key={i} guess={ isCurrentGuess ? currentGuess : guess ?? ''}
                                solution={solution}
                                isFinal = {!isCurrentGuess && guess != null}
                            />
                })
            }
        </div>
    )
}