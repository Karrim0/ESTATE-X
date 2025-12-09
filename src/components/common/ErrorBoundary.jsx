import { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    
    if (this.props.resetOnError) {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
            
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={48} className="text-red-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Oops! Something went wrong
            </h1>

            <p className="text-gray-600 mb-8 leading-relaxed">
              We're sorry for the inconvenience. An unexpected error occurred while 
              loading this page. Our team has been notified and is working on a fix.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <details className="mb-8 text-left bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                <summary className="cursor-pointer font-semibold text-gray-700 hover:text-gray-900">
                  🔍 Error Details (Dev Only)
                </summary>
                <div className="mt-4 space-y-2">
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-sm font-mono text-red-600 break-all">
                      {this.state.error.toString()}
                    </p>
                  </div>
                  {this.state.errorInfo && (
                    <div className="bg-white p-3 rounded-lg border border-gray-200 max-h-64 overflow-auto">
                      <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 active:scale-95"
              >
                <RefreshCw size={20} />
                Try Again
              </button>
              
              <a
                href="/"
                className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Home size={20} />
                Go Home
              </a>
            </div>

            <p className="mt-8 text-sm text-gray-500">
              Problem persisting? {' '}
              <a 
                href="mailto:support@estate-pro.com" 
                className="text-blue-600 hover:underline font-semibold"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;