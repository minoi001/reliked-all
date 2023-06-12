import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="max-w-md p-4 bg-white rounded shadow">
            <h1 className="text-4xl font-bold text-rose">
              Oops, there is an error!
            </h1>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
              className="mt-4 px-4 py-2 bg-rose text-white rounded"
            >
              Try again?
            </button>
          </div>
        </div>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
