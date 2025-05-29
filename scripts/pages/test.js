import { navigateTo } from '../main.js';

export function renderTest(container) {
    container.innerHTML = `
        <div class="test">
            <h2>Personality Test</h2>
            <p>For each question, rank the options from 1 (least like you) to 4 (most like you).</p>
            <input type="text" id="user-name" placeholder="Enter your name (optional)" />
            <div id="questions-container"></div>
            <button id="submit-test" style="display: none;">Submit</button>
        </div>
    `;

    // Example question rendering logic
    const questionsContainer = document.getElementById('questions-container');
    for (let i = 1; i <= 20; i++) {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <p>Question ${i}</p>
            <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
        `;
        questionsContainer.appendChild(questionDiv);
    }

    document.getElementById('submit-test').addEventListener('click', () => navigateTo('results'));
}