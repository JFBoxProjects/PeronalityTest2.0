const questions = [
    {
        text: "I am:",
        answers: [
            { text: "Encourager", color: "yellow" },
            { text: "Deep thinker", color: "green" },
            { text: "Doer", color: "red" },
            { text: "Listener", color: "blue" }
        ]
    },
    {
        text: "I am:",
        answers: [
            { text: "Motivator", color: "yellow" },
            { text: "Organizer", color: "green" },
            { text: "Achiever", color: "red" },
            { text: "Mediator", color: "blue" }
        ]
    },
    {
        text: "I am:",
        answers: [
            { text: "Charismatic", color: "yellow" },
            { text: "Realistic", color: "green" },
            { text: "Dynamic", color: "red" },
            { text: "Diplomatic", color: "blue" }
        ]
    },
    {
        text: "I am:",
        answers: [
            { text: "Stimulating", color: "yellow" },
            { text: "Systematic", color: "green" },
            { text: "Decisive", color: "red" },
            { text: "Accommodating", color: "blue" }
        ]
    },
    {
        text: "I am:",
        answers: [
            { text: "Spontaneous", color: "yellow" },
            { text: "Perfectionist", color: "green" },
            { text: "Risking", color: "red" },
            { text: "Accepting", color: "blue" }
        ]
    },
    {
        text: "I am:",
        answers: [
            { text: "Cheerful", color: "yellow" },
            { text: "Purposeful", color: "green" },
            { text: "Forceful", color: "red" },
            { text: "Tactful", color: "blue" }
        ]
    },
    {
        text: "I am:",
        answers: [
            { text: "Promoter", color: "yellow" },
            { text: "Planner", color: "green" },
            { text: "Producer", color: "red" },
            { text: "Supporter", color: "blue" }
        ]
    },
    {
        text: "I am:",
        answers: [
            { text: "Interrupts", color: "yellow" },
            { text: "Critical", color: "green" },
            { text: "Impatient", color: "red" },
            { text: "Indifferent", color: "blue" }
        ]
    },
    {
        text: "I am:",
        answers: [
            { text: "Unfocused", color: "yellow" },
            { text: "Pessimistic", color: "green" },
            { text: "Controlling", color: "red" },
            { text: "Indecisive", color: "blue" }
        ]
    },
    {
        text: "I am:",
        answers: [
            { text: "Persuasive", color: "yellow" },
            { text: "Diligent", color: "green" },
            { text: "Competitive", color: "red" },
            { text: "Compassionate", color: "blue" }
        ]
    },
    {
        text: "I am motivated by:",
        answers: [
            { text: "Fun & freedom", color: "yellow" },
            { text: "Belonging & contributing", color: "green" },
            { text: "Power & results", color: "red" },
            { text: "Peace & balance", color: "blue" }
        ]
    },
    {
        text: "I like:",
        answers: [
            { text: "Variety & activity", color: "yellow" },
            { text: "Facts, data & order", color: "green" },
            { text: "Bottom line results", color: "red" },
            { text: "Low key situations", color: "blue" }
        ]
    },
    {
        text: "I fear:",
        answers: [
            { text: "Loss of relationship", color: "yellow" },
            { text: "Change & disorder", color: "green" },
            { text: "Loss of control", color: "red" },
            { text: "Loss of harmony", color: "blue" }
        ]
    },
    {
        text: "I need to be:",
        answers: [
            { text: "Affirmed & recognized", color: "yellow" },
            { text: "Appreciated for my quality work", color: "green" },
            { text: "Respected for my accomplishments", color: "red" },
            { text: "Accepted for who I am", color: "blue" }
        ]
    },
    {
        text: "I am known for:",
        answers: [
            { text: "Knowing how to have a good time", color: "yellow" },
            { text: "Doing things right", color: "green" },
            { text: "Making things happen", color: "red" },
            { text: "Making people feel accepted", color: "blue" }
        ]
    },
    {
        text: "At work I would be described as:",
        answers: [
            { text: "Outgoing & social", color: "yellow" },
            { text: "Accurate & reliable", color: "green" },
            { text: "Direct & driven", color: "red" },
            { text: "Patient & neutral", color: "blue" }
        ]
    },
    {
        text: "I like being with people who are:",
        answers: [
            { text: "Verbally open & casual", color: "yellow" },
            { text: "Thoughtful & do their part", color: "green" },
            { text: "Competent & get their job done", color: "red" },
            { text: "Caring & kind", color: "blue" }
        ]
    },
    {
        text: "A key part of who I am is:",
        answers: [
            { text: "My relationships with others", color: "yellow" },
            { text: "My organization & systems", color: "green" },
            { text: "My accomplishments", color: "red" },
            { text: "My stability", color: "blue" }
        ]
    },
    {
        text: "I am frustrated by:",
        answers: [
            { text: "Routine/repetition", color: "yellow" },
            { text: "Unpredictability", color: "green" },
            { text: "Incompetence", color: "red" },
            { text: "Insensitivity", color: "blue" }
        ]
    },
    {
        text: "Under stress I become:",
        answers: [
            { text: "Fragmented & disorganized", color: "yellow" },
            { text: "Moody & withdrawn", color: "green" },
            { text: "Dictatorial & assertive", color: "red" },
            { text: "Overwhelmed & tired", color: "blue" }
        ]
    }
];

const App = () => {
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [scores, setScores] = React.useState({
        red: 0,
        blue: 0,
        green: 0,
        yellow: 0
    });
    const [showResults, setShowResults] = React.useState(false);

    const handleAnswer = (color) => {
        setScores(prev => ({
            ...prev,
            [color]: prev[color] + 1
        }));

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setShowResults(true);
        }
    };

    const resetTest = () => {
        setCurrentQuestion(0);
        setScores({
            red: 0,
            blue: 0,
            green: 0,
            yellow: 0
        });
        setShowResults(false);
    };

    return (
        <div className="app-container">
            <h1>Color Personality Test</h1>
            
            {!showResults ? (
                <>
                    <div className="progress-bar">
                        Question {currentQuestion + 1} of {questions.length}
                    </div>
                    <Question 
                        question={questions[currentQuestion]} 
                        onAnswer={handleAnswer}
                    />
                </>
            ) : (
                <>
                    <Results scores={scores} />
                    <button 
                        onClick={resetTest}
                        className="download-btn"
                        style={{ marginTop: '2rem' }}
                    >
                        Take Test Again
                    </button>
                </>
            )}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));