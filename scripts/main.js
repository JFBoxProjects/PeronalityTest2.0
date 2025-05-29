import { renderHome } from './pages/home.js';
import { renderTest } from './pages/test.js';
import { renderResults } from './pages/results.js';

const app = document.getElementById('app');

// Initial render of the home page
renderHome(app);

// Navigation logic
export function navigateTo(page) {
    app.innerHTML = '';
    if (page === 'test') renderTest(app);
    else if (page === 'results') renderResults(app);
    else renderHome(app);
}