const KEYS = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

type KeyboardProps = {
    disabled?: boolean
    activeLetters: string[]
    inactiveLetters: string[]
    addGuessedLetter: (letter: string) => void
}

function Keyboard({ disabled = false, activeLetters, inactiveLetters, addGuessedLetter }: KeyboardProps) {

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(40px,_1fr))] gap-4 text-black">
                {KEYS.map((key, index) => {
                    const isActive = activeLetters.includes(key)
                    const isInactive = inactiveLetters.includes(key)
                    return (
                        <button onClick={() => addGuessedLetter(key)}
                            className={`${"btn"} ${isActive ? "active" : ""} 
                                        ${isInactive ? "inactive" : ""} 
                                        ${isActive || isInactive || disabled ? "disabled" : ""}`}
                            key={index}>{key}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default Keyboard;
