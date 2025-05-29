// ErrorBoundary component
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by boundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="text-red-500 p-4 text-center">
                    <h2>Something went wrong.</h2>
                    <p>{this.state.error?.message}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-primary text-white rounded"
                    >
                        Reload Page
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

const questions = [
    { id: 1, prompt: "I am:", options: { yellow: "Encourager", blue: "Deep thinker", red: "Doer", green: "Listener" } },
    { id: 2, prompt: "I am:", options: { yellow: "Motivator", blue: "Organizer", red: "Achiever", green: "Mediator" } },
    { id: 3, prompt: "I am:", options: { yellow: "Charismatic", blue: "Realistic", red: "Dynamic", green: "Diplomatic" } },
    { id: 4, prompt: "I am:", options: { yellow: "Stimulating", blue: "Systematic", red: "Decisive", green: "Accommodating" } },
    { id: 5, prompt: "I am:", options: { yellow: "Spontaneous", blue: "Perfectionist", red: "Risking", green: "Accepting" } },
    { id: 6, prompt: "I am:", options: { yellow: "Cheerful", blue: "Purposeful", red: "Forceful", green: "Tactful" } },
    { id: 7, prompt: "I am:", options: { yellow: "Promoter", blue: "Planner", red: "Producer", green: "Supporter" } },
    { id: 8, prompt: "I am:", options: { yellow: "Interrupts", blue: "Critical", red: "Impatient", green: "Indifferent" } },
    { id: 9, prompt: "I am:", options: { yellow: "Unfocused", blue: "Pessimistic", red: "Controlling", green: "Indecisive" } },
    { id: 10, prompt: "I am:", options: { yellow: "Persuasive", blue: "diligent", red: "Competitive", green: "Compassionate" } },
    { id: 11, prompt: "I am motivated by:", options: { yellow: "Fun & freedom", blue: "Belonging & contributing", red: "Power & results", green: "Peace & balance" } },
    { id: 12, prompt: "I like:", options: { yellow: "Variety & activity", blue: "Facts, data & order", red: "Bottom line results", green: "Low key situations" } },
    { id: 13, prompt: "I fear:", options: { yellow: "Loss of relationship", blue: "Change & disorder", red: "Loss of control", green: "Loss of harmony" } },
    { id: 14, prompt: "I need to be:", options: { yellow: "Affirmed & recognized", blue: "Appreciated for my quality work", red: "Respected for my accomplishments", green: "Accepted for who I am" } },
    { id: 15, prompt: "I am known for:", options: { yellow: "Knowing how to have a good time", blue: "Doing things right", red: "Making things happen", green: "Making people feel accepted" } },
    { id: 16, prompt: "At work I would be described as:", options: { yellow: "Outgoing & social", blue: "accurate & reliable", red: "Direct & driven", green: "Patient & neutral" } },
    { id: 17, prompt: "I like being with people who are:", options: { yellow: "Verbally open & casual", blue: "Thoughtful & do their part", red: "Competent & get their job done", green: "Caring & kind" } },
    { id: 18, prompt: "A key part of who I am is:", options: { yellow: "My relationships with others", blue: "My organization & systems", red: "My accomplishments", green: "My stability" } },
    { id: 19, prompt: "I am frustrated by:", options: { yellow: "Routine/repetition", blue: "Unpredictability", red: "Incompetence", green: "Insensitivity" } },
    { id: 20, prompt: "Under stress I become:", options: { yellow: "Fragmented & disorganized", blue: "Moody & withdrawn", red: "Dictatorial & assertive", green: "Overwhelmed & tired" } },
];

const App = () => {
    const [page, setPage] = React.useState(1);
    const [userName, setUserName] = React.useState("");
    const [rankings, setRankings] = React.useState({});
    const [showResults, setShowResults] = React.useState(false);
    const [scores, setScores] = React.useState({
        red: 0,
        blue: 0,
        green: 0,
        yellow: 0
    });

    // Add progress calculation
    const progress = Math.round((Object.keys(rankings).length / questions.length) * 100);
    
    const allQuestionsAnswered = Object.keys(rankings).length === questions.length &&
        questions.every(q => Object.keys(rankings[q] || {}).length === 4);

    const handleRankChange = (questionIndex, color, rank) => {
        setRankings(prev => {
            const newRankings = { ...prev };
            if (!newRankings[questionIndex]) {
                newRankings[questionIndex] = {};
            }
            
            // Remove the rank if it's already assigned to another color
            Object.keys(newRankings[questionIndex]).forEach(existingColor => {
                if (newRankings[questionIndex][existingColor] === parseInt(rank)) {
                    delete newRankings[questionIndex][existingColor];
                }
            });
            
            newRankings[questionIndex][color] = parseInt(rank);
            return newRankings;
        });
    };

    const calculateScores = () => {
        const totals = { red: 0, blue: 0, green: 0, yellow: 0 };
        Object.values(rankings).forEach(questionRanks => {
            Object.entries(questionRanks).forEach(([color, rank]) => {
                totals[color] += rank;
            });
        });
        setScores(totals);
        setShowResults(true);
    };

    // Handle complete reset of the test
    const resetTest = () => {
        setScores({
            red: 0,
            blue: 0,
            green: 0,
            yellow: 0
        });
        setRankings({});
        setShowResults(false);
        setPage(1);
        setUserName("");
    };

    return (
        <ErrorBoundary>
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="max-w-4xl w-full content-container shadow-lg rounded-lg p-8">
                    {page === 1 && (
                        <div className="text-center">
                            <h1 className="text-4xl font-bold mb-6">Color Personality Test</h1>
                            <button
                                onClick={() => setPage(2)}
                                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                            >
                                Start Test
                            </button>
                        </div>
                    )}
                    
                    {page === 2 && (
                        <>
                            {/* Progress bar */}
                            <div className="mb-4">
                                <div className="w-full h-2 bg-gray-200 rounded-full">
                                    <div 
                                        className="h-2 bg-primary rounded-full transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <p className="text-right text-sm text-accent mt-1">
                                    {progress}% Complete ({Object.keys(rankings).length} of {questions.length} questions)
                                </p>
                            </div>

                            <div className="mb-8 p-4 border rounded-lg bg-white shadow-sm">
                                {/* Name input section */}
                                <h2 className="text-xl font-semibold text-primary mb-2">Enter Your Name</h2>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="w-full p-2 border rounded mb-4 text-accent focus:ring-2 focus:ring-primary"
                                />
                                <p className="text-accent">Please enter your name to personalize your results. If left blank, "Anonymous" will be used.</p>
                            </div>
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-primary mb-2">Instructions</h2>
                                <p className="text-accent">
                                    For each of the questions below, rank the four options from 1 to 4 based on how well they describe you:
                                    <ul className="list-disc ml-6 mt-2">
                                        <li><strong>4</strong>: Most like you</li>
                                        <li><strong>3</strong>: Next most like you</li>
                                        <li><strong>2</strong>: Next most like you</li>
                                        <li><strong>1</strong>: Least like you</li>
                                    </ul>
                                    Each number (1, 2, 3, 4) can only be used once per question. After completing all questions, your results will show your personality type scores (Yellow, Green, Red, Blue) in ranked order, along with their corresponding personality types and detailed explanations.
                                </p>
                            </div>
                            <div className="mb-8 p-4 bg-secondary rounded-lg">
                                <h2 className="text-xl font-semibold text-primary mb-2">Example</h2>
                                <p className="text-accent mb-2">For the question "I am:", you might rank the options as follows:</p>
                                <p className="text-accent">
                                    DRAMATIC: <span className="font-bold text-yellow-500">3</span>, 
                                    PRECISE: <span className="font-bold text-green-500">1</span>, 
                                    POWERFUL: <span className="font-bold text-red-500">4</span>, 
                                    ACCOMMODATING: <span className="font-bold text-blue-500">2</span>
                                </p>
                            </div>
                            {questions.map((question, index) => (
                                <Question
                                    key={index}
                                    question={question}
                                    questionIndex={index}
                                    rankings={rankings[index] || {}}
                                    onRankChange={(color, rank) => handleRankChange(index, color, rank)}
                                />
                            ))}
                            {allQuestionsAnswered && (
                                <div className="text-center mt-8">
                                    <button
                                        onClick={calculateScores}
                                        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                                    >
                                        Submit
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                    
                    {page === 3 && (
                        <ErrorBoundary>
                            <Results scores={scores} userName={userName} />
                            <div className="text-center mt-8">
                                <button 
                                    onClick={() => {
                                        setPage(1);
                                        setRankings({});
                                        setUserName("");
                                        setScores({
                                            red: 0,
                                            blue: 0,
                                            green: 0,
                                            yellow: 0
                                        });
                                    }}
                                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                                >
                                    Take Test Again
                                </button>
                            </div>
                        </ErrorBoundary>
                    )}
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default App;