import { useCallback, useEffect, useRef, useState } from "react"
import { Line } from "./Line"
import { Keyboard } from "./Keyboard"

const ALPHA_STRING = 'abcdefghijklmnopqrstuvwxyz'
const AlPHABETS = ALPHA_STRING.split('')

export const Board = ({fn}) => {

    // const isLetter = useCallback((char)=>{
    //     const code = char.charCodeAt(0);
    //     return (code >= 65 && code <= 90) || (code >= 97 && code <= 122)
    // } , [])

    const [solution , setSolution] = useState('')
    const[guesses , setGuesses] = useState(new Array(6).fill(null))
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



    const handleKeyboardClick = (key) => {
    if (isGameOver) return
    
    if (key === 'BACKSPACE') {
        setCurrentGuess(currentGuess.slice(0, -1))
    } else if (key === 'ENTER') {
        if (currentGuess.length !== 5) return
        
        const newGuesses = [...guesses]
        newGuesses[guesses.findIndex((val) => val == null)] = currentGuess
        setGuesses(newGuesses)
        updateUsedLetters(currentGuess, solution)
        setCurrentGuess('')
        setTrial(prev => prev - 1)
        
        const isCorrect = solution === currentGuess
        if (isCorrect) {
            setIsGameOver(true)
        }
    } else if (currentGuess.length < 5) {
        setCurrentGuess(prev => prev + key.toLowerCase())
    }
    }


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

            // if(!AlPHABETS.includes(e.key.toLowerCase())){
            //     return
            // }
            // console.log(e.key)
            // console.log(AlPHABETS.includes(e.key.toLowerCase()))
            if (currentGuess.length < 5 && AlPHABETS.includes(e.key.toLowerCase())) {
                console.log(e.key)
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
    if(!trial){
        fn(solution.toUpperCase())
    }

    return(
        <div className="h-full w-1/2 flex flex-col justify-center items-center gap-4">

            <div className = 'flex justify-center text-[#b59f3b] text-2xl lg:text-[50px]'> Wordle </div>

            <div className="w-fit lg:h-93 flex flex-col gap-1 lg:gap-3 mb-4 lg:mb-10">
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

            <Keyboard usedLetters={usedLetters} 
            onKeyClick={handleKeyboardClick}/>

            <button 
                className='bg-[#6a6a6a] w-22 h-8 sm:h-8 text-sm sm:text-sm lg:text-lg lg:w-30 lg:h-10 rounded-2xl text-white hover:cursor-pointer mb-2'
                onClick={()=>window.location.reload(true)}
                >Play Again!
            </button>

            {/* {!trial && (
                <div className="h-10 lg:text-[20px] w-full text-xl font-bold text-white flex justify-center mt-5">
                    <div>Word : <span className="uppercase">{solution}</span></div>
                </div>
            )} */}
        </div>
    )
}