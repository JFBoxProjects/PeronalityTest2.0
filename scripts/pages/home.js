import { navigateTo } from '../main.js';

export function renderHome(container) {
    container.innerHTML = `
        <div class="home">
            <h1>Take the Color Personality Test</h1>
            <button id="start-test">Start Test</button>
        </div>
    `;

    document.getElementById('start-test').addEventListener('click', () => navigateTo('test'));
}