const React = window.React;
const { useState } = React;
const { jsPDF } = window.jspdf;

import { personalityTypes, additionalContent } from '../utils/data.js';

export function Results({ rankings, userName }) {
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [pdfError, setPdfError] = useState(null);

    const totals = { yellow: 0, green: 0, red: 0, blue: 0 };
    Object.values(rankings).forEach(question => {
        Object.entries(question).forEach(([color, rank]) => {
            totals[color] += rank;
        });
    });

    const sortedResults = Object.entries(totals)
        .map(([color, score]) => ({
            color,
            score,
            type: personalityTypes[color].type,
            explanation: personalityTypes[color].explanation,
        }))
        .sort((a, b) => b.score - a.score);

    const handleDownloadPDF = async () => {
        setIsGeneratingPDF(true);
        setPdfError(null);
        
        try {
            const doc = new jsPDF();
            let yPosition = 20;
            
            const checkPageHeight = (height) => {
                if (yPosition + height > 280) {
                    doc.addPage();
                    yPosition = 20;
                }
            };

            // Add title and name
            doc.setFontSize(16);
            doc.setTextColor(30, 58, 138);
            doc.text("Color Personality Test Results", 20, yPosition);
            yPosition += 10;

            // Add percentages section
            doc.setFontSize(14);
            doc.text(`Results for: ${userName || "Anonymous"}`, 20, yPosition);
            yPosition += 15;

            // Add personality type descriptions
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            
            sortedResults.forEach(({ color, score }) => {
                doc.text(`${color.charAt(0).toUpperCase() + color.slice(1)}: ${score}`, 20, yPosition);
                yPosition += 10;
            });

            // Add all the detailed content sections
            const sections = [additionalContent.plannerBlue, additionalContent.peacekeeperGreen, 
                            additionalContent.producerRed, additionalContent.promoterYellow];
            
            sections.forEach(section => {
                // Start new page for each section
                doc.addPage();
                yPosition = 20;

                doc.setFontSize(14);
                doc.setTextColor(30, 58, 138);
                doc.text(section.title, 20, yPosition);
                yPosition += 15;

                doc.setFontSize(10);
                doc.setTextColor(0, 0, 0);
                
                section.content.forEach(item => {
                    const labelLines = doc.splitTextToSize(item.label, 50);
                    const valueLines = doc.splitTextToSize(item.value, 130);
                    
                    if (yPosition + (Math.max(labelLines.length, valueLines.length) * 6) > 280) {
                        doc.addPage();
                        yPosition = 20;
                    }

                    labelLines.forEach((line, i) => {
                        doc.text(line, 20, yPosition + (i * 5));
                    });
                    
                    valueLines.forEach((line, i) => {
                        doc.text(line, 75, yPosition + (i * 5));
                    });

                    yPosition += Math.max(labelLines.length, valueLines.length) * 5 + 5;
                });
            });

            doc.save(`color_personality_results_${userName || 'anonymous'}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
            setPdfError("There was an error generating your PDF. Please try again.");
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    return (
        <div className="mt-8 p-6 border rounded-lg bg-white shadow-sm">
            {isGeneratingPDF && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p className="mt-4 text-primary">Generating your PDF...</p>
                </div>
            )}

            {pdfError && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                    {pdfError}
                </div>
            )}

            <h2 className="text-2xl font-bold text-primary mb-4">Your Personality Results</h2>
            <h3 className="text-xl font-semibold text-accent mb-4">Score Totals</h3>
            <ul className="space-y-2 mb-6">
                {sortedResults.map(({ color, score }) => (
                    <li key={color} className="flex items-center space-x-2">
                        <span className={`w-4 h-4 rounded-full bg-${color}-500`}></span>
                        <span className="capitalize text-accent font-medium">
                            {color}: {score} points
                        </span>
                    </li>
                ))}
            </ul>
            <h3 className="text-xl font-semibold text-accent mb-4">
                Personality Types and Explanations
            </h3>
            {sortedResults.map(({ color, type, explanation }) => (
                <div
                    key={color}
                    className="mb-6 p-4 bg-secondary rounded-lg"
                    dangerouslySetInnerHTML={{ __html: explanation }}
                />
            ))}
            <button
                onClick={handleDownloadPDF}
                className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-primary"
            >
                Download Results as PDF
            </button>
        </div>
    );
}