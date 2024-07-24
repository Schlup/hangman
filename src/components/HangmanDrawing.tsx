type HangmanDrawingProps = {
    numberOfGuesses: number
}

const HEAD = (<div className="h-12 w-12 rounded-full border-4 border-white absolute top-11 -right-5" />)
const BODY = (<div className="w-1 h-24 bg-white -mt-2 -ml-2 border-white absolute top-24 right-0" />)
const LARM = (<div className="w-16 h-1 bg-white border-white absolute top-28 right-0 rotate-12" />)
const RARM = (<div className="w-16 h-1 bg-white border-white absolute top-28 -right-16 mr-1 -rotate-12" />)
const LLEG = (<div className="w-16 h-1 bg-white border-white absolute top-52 -mr-2 -mt-1 right-0 -rotate-45" />)
const RLEG = (<div className="w-16 h-1 bg-white border-white absolute mr-1 top-52 -mt-1 -right-14 rotate-45" />)

const BODY_PARTS = [HEAD, BODY, LARM, RARM, LLEG, RLEG]

function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
    return (
        <div className="relative">
            {BODY_PARTS.slice(0, numberOfGuesses)}
            <div className="h-12 w-2 bg-white absolute top-0 right-0" />
            <div className="h-2 w-56 bg-white ml-28" />
            <div className="h-96 w-2 bg-white ml-28" />
            <div className="h-2 w-56 bg-white" />
        </div>
    )
}

export default HangmanDrawing