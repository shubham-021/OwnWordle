import clsx from "clsx"

const KEYBOARD_ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
]

export const Keyboard = ({ usedLetters }) => {

    const getKeyStyle = (key) => {
        if (key === 'ENTER' || key === 'BACKSPACE') {
            return 'w-16 h-13' // Wider for special keys
        }
        return 'w-10 h-13' // Same height as cells, but wider than cells
    }

    const getKeyColor = (key) => {
        
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
        <div className="flex flex-col  gap-2 -translate-y-10 -translate-x-5">
            {KEYBOARD_ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1 justify-center">
                    {row.map((key) => (
                        <button
                            key={key}
                            // onClick={() => handleClick(key)}
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
    )
}
