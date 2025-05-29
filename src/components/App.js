const React = window.React;
const { useState } = React;

import { Question } from './Question.js';
import { Results } from './Results.js';
import { ErrorBoundary } from './ErrorBoundary.js';
import { questions } from '../utils/data.js';

export function App() {
    const [page, setPage] = useState(1);
    const [rankings, setRankings] = useState({});
    const [userName, setUserName] = useState("");

    const allQuestionsAnswered = Object.keys(rankings).length === questions.length &&
        questions.every(q => Object.keys(rankings[q.id] || {}).length === 4);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="max-w-4xl w-full content-container shadow-lg rounded-lg p-8">
                {page === 1 && (
                    <div className="text-center">
                        <h1 className="text-5xl font-bold mb-6 swirl-text">Color Personality Test</h1>
                        <p className="text-accent mb-6">Take this test to discover your personality type!</p>
                        <button
                            onClick={() => setPage(2)}
                            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                        >
                            Start
                        </button>
                    </div>
                )}
                {page === 2 && (
                    <>
                        <div className="mb-8 p-4 border rounded-lg bg-white shadow-sm">
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
                                For each question, rank the options from 1 to 4:
                                <ul className="list-disc ml-6 mt-2">
                                    <li><strong>4</strong>: Most like you</li>
                                    <li><strong>3</strong>: Next most like you</li>
                                    <li><strong>2</strong>: Next most like you</li>
                                    <li><strong>1</strong>: Least like you</li>
                                </ul>
                            </p>
                        </div>
                        {questions.map(question => (
                            <Question
                                key={question.id}
                                question={question}
                                rankings={rankings}
                                setRankings={setRankings}
                            />
                        ))}
                        {allQuestionsAnswered && (
                            <div className="text-center mt-8">
                                <button
                                    onClick={() => setPage(3)}
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
                        <Results rankings={rankings} userName={userName} />
                    </ErrorBoundary>
                )}
            </div>
        </div>
    );
}