import { useState } from 'react';

const personalityTypes = {
    yellow: {
        type: "Promoter",
        explanation: `As a Promoter, you are an enthusiastic individual who thrives on fun and excitement. Your motives center around recognition and approval, with a need for positive attention. Your strengths lie in creativity, spontaneity, energy, and charm, making you a natural entertainer who excels at starting projects and inspiring others. You communicate in a dramatic, persuasive, and optimistic way, preferring an informal, stimulating office environment. However, you may be perceived as undisciplined, disorganized, or superficial. Your decisions are spontaneous and heart-driven, though others might label you as "Scatterific" or a "Space Cadet" due to your dynamic nature.`
    },
    green: {
        type: "Planner",
        explanation: `As a Planner, you are a problem-solver who values belonging and contributing to a team. Your motives center on appreciation, acceptance, and order, with a need for accuracy and security. Your strengths lie in integrity, organization, sincerity, and reliability, making you a thoughtful and practical individual. You excel at applying facts and experience to plan and solve problems, preferring an organized, functional office environment. Your communication is indirect, detailed, and factual, often favoring written messages. However, you may come across as self-righteous, perfectionistic, or critical, and can be prone to worry or moodiness. You focus on facts, tasks, and quality, with calculated, head-driven decisions. You enjoy developing systems and processes, but others might label you as "Anal Retentive" or "Nit-picky" due to your meticulous nature.`
    },
    red: {
        type: "Producer",
        explanation: `As a Producer, you are a driven leader motivated by power and results. You seek approval, respect, and the need to be right, with a strong desire for control and leadership. Your strengths include decisiveness, confidence, competence, and vision, making you an influential doer who excels at developing concepts and achieving goals. Your communication is direct, authoritative, and logical, focusing on the bottom line without emotional embellishment. You prefer an efficient, effective, and productive office environment, thriving on the completion of tasks and winning outcomes. However, you may be perceived as domineering, selfish, or insensitive, with tendencies toward manipulation or arrogance. Your decisions are decisive and head-driven, but others might call you "Ruthless" or "Attila the Hun" due to your assertive nature.`
    },
    blue: {
        type: "Peacekeeper",
        explanation: `As a Peacekeeper, you are a diplomat who seeks peace and balance, valuing acceptance, respect, and independence. Your motives center on stability and contentment, with strengths in clarity, listening, diplomacy, and kindness. You are patient, moderate, and adaptable, excelling at collaborating and mediating to meet the daily concerns of people. Your communication is indirect, empathetic, and calm, though you may hesitate to speak up. You prefer a friendly, casual office with an open-door policy, enjoying involvement and relationships. However, you can be indecisive, unmotivated, or stubborn, and may feel overwhelmed under pressure. Your decisions are consultative and heart-driven, focusing on facts and relationships. Others may see you as "Ignored" or a "Softie," reflecting your gentle, accommodating demeanor.`
    }
};

const additionalContent = {
    personalitySummary: {
        title: "Personality Type Summary",
        table: [
            { header: "TYPE in the work environment", promoter: "PROMOTER Yellow", planner: "PLANNER Blue", producer: "PRODUCER Red", peacekeeper: "PEACEKEEPER Green" },
            { header: "ROLES:", promoter: "Motivator", planner: "Problem-solver", producer: "Leader", peacekeeper: "Diplomat" },
            { header: "MOTIVES:", promoter: "Fun and encouragement", planner: "Belonging and contributing", producer: "Power and results", peacekeeper: "Peace and balance" },
            { header: "NEEDS:", promoter: "Attention Applause Recognition", planner: "Appreciation Acceptance Order", producer: "Approval Respect To be right", peacekeeper: "Acceptance Respect Independence" },
            { header: "WANTS:", promoter: "Relationships Freedom", planner: "Accuracy Security", producer: "Control Leadership", peacekeeper: "Stability Contentment" },
            { header: "STRENGTHS:", promoter: "Brainstormer Encourager Enthusiastic Charismatic Creative Articulate Optimistic", planner: "Integrity Organizer Sincere Reliable Practical Thoughtful Loyal", producer: "Decisive Doer Confident Competent Driven Vision Influential", peacekeeper: "Clarity Listener Diplomatic Kind Patient Moderate Adaptable" },
            { header: "LIMITATIONS:", promoter: "Disorganized Careless Impulsive Unrealistic Obnoxious", planner: "Self-righteous Perfectionist Worrier Moody Critical", producer: "Domineering Selfish Insensitive Manipulative Arrogant", peacekeeper: "Indecisive Unmotivated Methodical Stubborn Overwhelmed" },
            { header: "FOCUS ON:", promoter: "Possibilities and relationships", planner: "Facts, tasks and quality", producer: "Possibilities and tasks", peacekeeper: "Facts and relationships" }
        ]
    }
};

const Results = ({ scores, userName }) => {
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [pdfError, setPdfError] = useState(null);

    // Calculate percentages and determine dominant color
    const calculatePercentages = () => {
        const total = Object.values(scores).reduce((a, b) => a + b, 0);
        return {
            red: ((scores.red / total) * 100).toFixed(1),
            blue: ((scores.blue / total) * 100).toFixed(1),
            green: ((scores.green / total) * 100).toFixed(1),
            yellow: ((scores.yellow / total) * 100).toFixed(1)
        };
    };

    const percentages = calculatePercentages();
    const dominantColor = Object.entries(percentages)
        .reduce((a, b) => (parseFloat(a[1]) > parseFloat(b[1]) ? a : b))[0];

    const handleDownloadPDF = async () => {
        setIsGeneratingPDF(true);
        setPdfError(null);
        
        try {
            const { jsPDF } = window.jspdf;
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
            
            // Score percentages in ranked order
            Object.entries(percentages)
                .sort(([,a], [,b]) => b - a)
                .forEach(([color, percentage]) => {
                    doc.text(`${color.charAt(0).toUpperCase() + color.slice(1)}: ${percentage}%`, 20, yPosition);
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
        <div className="results-container">
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

            <h2 className="text-2xl font-bold text-center mb-6">Your Results</h2>
            
            {/* Score cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {Object.entries(percentages).map(([color, percentage]) => (
                    <div key={color} className={`p-4 rounded-lg bg-${color}-100 text-center`}>
                        <h3 className={`font-semibold text-${color}-700`}>
                            {personalityTypes[color].type} ({color.charAt(0).toUpperCase() + color.slice(1)})
                        </h3>
                        <p className={`text-xl font-bold text-${color}-800`}>{percentage}%</p>
                    </div>
                ))}
            </div>

            {/* Dominant type */}
            <div className="text-center mb-8">
                <h3 className="text-xl font-semibold mb-2">Your Dominant Type:</h3>
                <p className="text-2xl font-bold text-primary">
                    {personalityTypes[dominantColor].type} ({dominantColor.charAt(0).toUpperCase() + dominantColor.slice(1)})
                </p>
            </div>

            {/* Download button */}
            <button 
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className={`w-full md:w-auto px-6 py-3 bg-primary text-white rounded-lg 
                    ${isGeneratingPDF ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-800'} 
                    focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 mb-8`}
            >
                {isGeneratingPDF ? 'Generating PDF...' : 'Download Results as PDF'}
            </button>

            {/* Detailed results */}
            <div className="personality-details space-y-8">
                {Object.entries(personalityTypes)
                    .sort(([colorA], [colorB]) => percentages[colorB] - percentages[colorA])
                    .map(([color, { type, explanation }]) => (
                        <div key={color} className={`p-6 rounded-lg bg-${color}-50`}>
                            <h3 className={`text-xl font-semibold mb-3 text-${color}-700`}>{type}</h3>
                            <div 
                                className={`text-${color}-900 prose`} 
                                dangerouslySetInnerHTML={{ __html: explanation }}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Results;