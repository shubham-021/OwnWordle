import { useCallback, useEffect, useRef, useState } from "react"
import { Line } from "./Line"
import { Keyboard } from "./Keyboard"

export const Board = () => {

    const isLetter = useCallback((char)=>{
        const code = char.charCodeAt(0);
        return (code >= 65 && code <= 90) || (code >= 97 && code <= 122)
    } , [])

    const [solution , setSolution] = useState('')
    const[guesses , setGuesses] = useState(new Array(5).fill(null))
    const[currentGuess , setCurrentGuess] = useState('')
    const [isGameOver , setIsGameOver] = useState(false)
    const [trial , setTrial] = useState(6)
    const [usedLetters, setUsedLetters] = useState({}) // New state for tracking used letters

    const updateUsedLetters = useCallback((guess, solution) => {
        const newUsedLetters = { ...usedLetters }
        
        for (let i = 0; i < guess.length; i++) {
            const letter = guess[i].toLowerCase()
            const solutionLetter = solution[i].toLowerCase()
            
            if (solutionLetter === letter) {
                newUsedLetters[letter] = 'correct'
            } else if (solution.toLowerCase().includes(letter)) {
                // Only update to 'includes' if not already 'correct'
                if (newUsedLetters[letter] !== 'correct') {
                    newUsedLetters[letter] = 'includes'
                }
            } else {
                // Only update to 'incorrect' if not already 'correct' or 'includes'
                if (!newUsedLetters[letter]) {
                    newUsedLetters[letter] = 'incorrect'
                }
            }
        }
        
        setUsedLetters(newUsedLetters)
    }, [usedLetters])




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
                updateUsedLetters(currentGuess, solution)
                setTrial(prev => prev - 1)
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
    },[currentGuess , isGameOver , solution, updateUsedLetters])
    
    useEffect(()=>{
        const fetchWord = async()=>{
            const id = Math.floor(Math.random()*350)
            const res = await fetch(`https://cfwordleserver.shubhamthesingh21.workers.dev/word/${id}`)
            const finalRes = await res.json()
            const word = finalRes.word
            console.log(word)
            setSolution(word)
        }

        fetchWord()
    },[])

    // useEffect(()=>{
    //     if(!guesses.includes(null)){
    //         setIsGameOver(true)
    //     }
    //     console.log(trial)
    // },[guesses])

    return(
        <div className="h-full w-1/2 flex flex-col justify-center items-center">

      <div className = 'font-[Cartograph_CF] -translate-x-5 -translate-y-5 text-[#b59f3b]  text-[50px]'> Wordle </div>

            <div className="h-93 w-80 flex flex-col gap-3 mb-10">
                {
                    guesses.map((guess , i)=>{
                        const isCurrentGuess = i === guesses.findIndex(val => val == null)
                        return <Line key={i} guess={ isCurrentGuess ? currentGuess : guess ?? ''}
                                    solution={solution}
                                    isFinal = {!isCurrentGuess && guess != null }
                                />
                    })
                }
            </div> 

            <Keyboard usedLetters={usedLetters}/>

            <button 
                className='bg-[#538d4e] w-30 h-10 -translate-x-5 -translate-y-5 rounded-2xl text-white hover:cursor-pointer'
                onClick={()=>window.location.reload(true)}
                >Replay
            </button>

            {!trial && (
                <div className="h-10 lg:text-[20px] -translate-x-5 btranslate-y-5 w-full text-xl font-bold text-white flex justify-center mt-5">
                    <div>Correct Word was : <span className="uppercase">{solution}</span></div>
                </div>
            )}

       
        </div>
    )
}