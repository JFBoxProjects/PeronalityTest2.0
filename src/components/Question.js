const Question = ({ question, rankings, onRankChange }) => {
    const getUsedRanks = () => {
        return Object.values(rankings).map(Number);
    };

    const getAvailableRanks = () => {
        const usedRanks = getUsedRanks();
        return [1, 2, 3, 4].filter(rank => !usedRanks.includes(rank));
    };

    const isRankValid = (rank, color) => {
        const currentRank = rankings[color];
        if (currentRank === rank) return true;
        return !getUsedRanks().includes(rank);
    };

    return (
        <div className="mb-6 p-4 border rounded-lg bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-primary mb-2">
                Question {question.id}: {question.prompt}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(question.options).map(([color, text]) => (
                    <div key={color} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded transition-colors">
                        <label className="flex-1 text-accent">{text}</label>
                        <select
                            className={`border rounded p-1 bg-white text-accent focus:ring-2 focus:ring-primary ${
                                rankings[color] ? 'border-primary' : 'border-gray-300'
                            }`}
                            value={rankings[color] || ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === "" || isRankValid(Number(value), color)) {
                                    onRankChange(color, value);
                                }
                            }}
                        >
                            <option value="" disabled>Select</option>
                            {[1, 2, 3, 4].map(num => (
                                <option 
                                    key={num} 
                                    value={num}
                                    disabled={!isRankValid(num, color)}
                                >
                                    {num}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
            <div className="mt-2 text-sm text-gray-500">
                Available ranks: {getAvailableRanks().join(", ")}
            </div>
        </div>
    );
};

export default Question;