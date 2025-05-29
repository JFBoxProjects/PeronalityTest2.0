const Question = ({ question, onAnswer }) => {
    return (
        <div className="question-container">
            <h2 className="question-text">{question.text}</h2>
            <div className="answers-grid">
                {question.answers.map((answer, index) => (
                    <button
                        key={index}
                        className="answer-button"
                        onClick={() => onAnswer(answer.color)}
                    >
                        {answer.text}
                    </button>
                ))}
            </div>
        </div>
    );
};