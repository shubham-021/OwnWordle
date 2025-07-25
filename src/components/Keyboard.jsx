import clsx from "clsx"

const KEYBOARD_ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
]

export const Keyboard = ({ usedLetters, onKeyClick }) => {

    const getKeyStyle = (key) => {
        if (key === 'ENTER' || key === 'BACKSPACE') {
            return 'w-12 h-9 lg:w-16 lg:h-13 mt-3' 
        }
        return 'w-8 h-9 lg:w-10 lg:h-13'
    }


    const handleClick = (key) => {
        if (onKeyClick) {
            onKeyClick(key)
        }
    }

    const getKeyColor = (key) => {

        if (key === 'ENTER') return 'bg-[#538d4e]'
        if (key === 'BACKSPACE') return 'bg-[#bc5050]'
        
        const letterStatus = usedLetters[key.toLowerCase()]
        if (letterStatus === 'correct') {
            return 'bg-[#538d4e]'
        } else if (letterStatus === 'includes') {
            return 'bg-[#b59f3b]'
        } else if (letterStatus === 'incorrect') {
            return 'bg-[#2a2a2a]'
        }
        
        return 'bg-[#6a6a6a]'
    }

    return (
        <div className="w-full flex justify-center items-center px-2 translate-y-5 sm:translate-y-0">
            <div className="flex flex-col gap-2 w-full">
                {KEYBOARD_ROWS.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-1 justify-center w-full">
                        {row.map((key) => (
                            <button
                                key={key}
                                onClick={() => handleClick(key)}
                                className={clsx(
                                    getKeyStyle(key),
                                    getKeyColor(key),
                                    "flex justify-center items-center text-white rounded-md uppercase font-bold text-sm cursor-pointer transition-colors duration-200"
                                )}
                            >
                                {key === 'BACKSPACE' ? '⌫' : key}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>  
    )
}
