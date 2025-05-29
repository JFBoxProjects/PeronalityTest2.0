import { App } from './components/App.js';
import { ErrorBoundary } from './components/ErrorBoundary.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
);

console.log("React application initialized");