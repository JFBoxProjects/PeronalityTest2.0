const React = window.React;
const { useState, useEffect } = React;

export function ErrorBoundary({ children }) {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const handleError = (error) => {
            console.error("ErrorBoundary caught an error:", error);
            setHasError(true);
        };
        window.addEventListener('error', handleError);
        return () => window.removeEventListener('error', handleError);
    }, []);

    if (hasError) {
        return (
            <div className="text-red-500 p-4 text-center">
                Something went wrong. Please check the console (F12) for details and refresh the page.
            </div>
        );
    }

    return children;
}