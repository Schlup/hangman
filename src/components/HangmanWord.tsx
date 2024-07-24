type HangmamWordProps = {
    reveal?: boolean
    guessedLetters: String[]
    wordToGuess: String
}

function HangmanWord({ reveal = false, guessedLetters, wordToGuess }: HangmamWordProps) {

    return (
        <div className="flex gap-6 text-7xl font-semibold uppercase">
            {wordToGuess.split("").map((letter, i) => (
                <span className="border-b-4 border-white" key={i}>
                    <span style={{
                        visibility: guessedLetters.includes(letter) || reveal ? "visible" : "hidden",
                        color: !guessedLetters.includes(letter) && reveal ? "red" : "white"
                    }}>
                        {letter}
                    </span>
                </span>
            ))}
        </div>
    )
}

export default HangmanWord