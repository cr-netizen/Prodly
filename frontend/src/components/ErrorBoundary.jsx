import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-paper px-4 text-center text-ink dark:bg-paper-night dark:text-ink-night">
          <h1 className="font-display text-3xl font-semibold">
            Something went wrong
          </h1>
          <p className="max-w-sm text-ink-soft dark:text-ink-night-soft">
            An unexpected error occurred. Try refreshing the page — your data
            is safe.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full bg-brand px-5 py-2 text-sm font-medium text-white transition hover:bg-brand-dark"
          >
            Refresh page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
