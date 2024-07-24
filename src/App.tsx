import { useState, useEffect, useCallback } from "react";
import enWords from "./words/en-words.json";
import ptWords from "./words/pt-words.json";
import i18next from "i18next";
import HangmanDrawing from "./components/HangmanDrawing";
import HangmanWord from "./components/HangmanWord";
import Keyboard from "./components/Keyboard";
import { useTranslation } from "react-i18next";

function App() {
    const [showLanguageSelection, setShowLanguageSelection] = useState(true);
    const [language, setLanguage] = useState<string>("");
    const [wordToGuess, setWordToGuess] = useState<string>("");
    const [t, i18n] = useTranslation("global")

    // Change the language based on the user input
    useEffect(() => {
        if (language === "en") {
            setWordToGuess(enWords[Math.floor(Math.random() * enWords.length)]);
        } else if (language === "pt") {
            setWordToGuess(ptWords[Math.floor(Math.random() * ptWords.length)]);
        }
    }, [language]);

    console.log("WORD: ", wordToGuess);

    const handleSelectionClick = (lang: string) => {
        setShowLanguageSelection(false);
        setLanguage(lang);
        i18next.changeLanguage(lang);
    };

    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));
    const isLoser = incorrectLetters.length >= 6;
    const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter));

    const addGuessedLetter = useCallback((letter: string) => {
        if (guessedLetters.includes(letter) || isLoser || isWinner) return;

        setGuessedLetters(currentLetters => [...currentLetters, letter]);
    }, [guessedLetters, isWinner, isLoser]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();

            if (!key.match(/^[a-z]$/)) return;

            e.preventDefault();
            if (!isLoser && !isWinner) {
                addGuessedLetter(key);
            }
        };

        document.addEventListener("keypress", handler);

        return () => {
            document.removeEventListener("keypress", handler);
        };
    }, [addGuessedLetter, isLoser, isWinner]);

    return (
        <div className="bg-zinc-900 min-h-screen flex flex-col items-center text-white">
            {showLanguageSelection ? (
                <div className="h-screen w-auto flex justify-center items-center">
                    <div className="flex gap-4 flex-col">
                        <button className="bg-neutral-800 text-white px-6 py-2 rounded-md" onClick={() => handleSelectionClick("en")}>
                            English
                        </button>
                        <button className="bg-neutral-800 text-white px-6 py-2 rounded-md" onClick={() => handleSelectionClick("pt")}>
                            Português
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-zinc-900 flex w-auto flex-col gap-2 m-auto items-center text-white">

                    <div className="text-lg text-center my-4">
                        {isWinner && t("winner.message")}
                        {isLoser && t("loser.message")}
                    </div>

                    <HangmanDrawing numberOfGuesses={incorrectLetters.length} />

                    <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />

                    <div className="self-stretch">
                        <Keyboard
                            disabled={isLoser || isWinner}
                            activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
                            inactiveLetters={incorrectLetters}
                            addGuessedLetter={addGuessedLetter}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
