import { Cell } from "./Cell"

export const Line = ({guess , solution , isFinal}) => {

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
        <div className="h-12 w-80 flex gap-1">
            {cells}
        </div>
    )
}