const Results = ({ scores }) => {
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

    const handleDownloadPDF = () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.text('Color Personality Test Results', 20, 20);
        doc.text(`Red: ${percentages.red}%`, 20, 40);
        doc.text(`Blue: ${percentages.blue}%`, 20, 50);
        doc.text(`Green: ${percentages.green}%`, 20, 60);
        doc.text(`Yellow: ${percentages.yellow}%`, 20, 70);
        doc.text(`Dominant Color: ${dominantColor}`, 20, 90);
        
        doc.save('personality-test-results.pdf');
    };

    return (
        <div className="results-container">
            <h2>Your Results</h2>
            <div className="results-grid">
                <div className="result-item red">
                    <h3>Red</h3>
                    <p>{percentages.red}%</p>
                </div>
                <div className="result-item blue">
                    <h3>Blue</h3>
                    <p>{percentages.blue}%</p>
                </div>
                <div className="result-item green">
                    <h3>Green</h3>
                    <p>{percentages.green}%</p>
                </div>
                <div className="result-item yellow">
                    <h3>Yellow</h3>
                    <p>{percentages.yellow}%</p>
                </div>
            </div>
            <div className="dominant-color">
                <h3>Your Dominant Color:</h3>
                <p className={dominantColor}>{dominantColor}</p>
            </div>
            <button onClick={handleDownloadPDF} className="download-btn">
                Download Results as PDF
            </button>
        </div>
    );
};