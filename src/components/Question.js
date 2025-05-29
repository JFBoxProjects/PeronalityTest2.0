const React = window.React;

export function Question({ question, rankings, setRankings }) {
    const handleRankChange = (color, value) => {
        const newRankings = { ...rankings };
        const currentQuestion = newRankings[question.id] || {};

        const colorWithValue = Object.keys(currentQuestion).find(
            key => currentQuestion[key] === parseInt(value) && key !== color
        );

        if (colorWithValue) {
            delete currentQuestion[colorWithValue];
        }

        currentQuestion[color] = parseInt(value);
        newRankings[question.id] = currentQuestion;
        setRankings(newRankings);
    };

    return (
        <div className="mb-6 p-4 border rounded-lg bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-primary mb-2">Question {question.id}: {question.prompt}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(question.options).map(([color, text]) => (
                    <div key={color} className="flex items-center space-x-2">
                        <label className="flex-1 text-accent">{text}</label>
                        <select
                            className="border rounded p-1 bg-white text-accent focus:ring-2 focus:ring-primary"
                            value={rankings[question.id]?.[color] || ""}
                            onChange={(e) => handleRankChange(color, e.target.value)}
                        >
                            <option value="" disabled>Select</option>
                            {[1, 2, 3, 4].map(num => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
}