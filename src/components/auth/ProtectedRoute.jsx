// src/components/auth/ProtectedRoute.jsx

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FullPageLoader } from '../common/LoadingStates';

/**
 * Protected Route Component
 * Restricts access to authenticated users only
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {Array<string>} props.allowedRoles - Array of allowed roles
 * @param {string} props.redirectTo - Redirect URL if not authorized
 */
const ProtectedRoute = ({ 
  children, 
  allowedRoles = [], 
  redirectTo = '/login' 
}) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  // Show loader while checking authentication
  if (loading) {
    return <FullPageLoader message="Verifying authentication..." />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role-based access
  if (allowedRoles.length > 0 && user) {
    if (!allowedRoles.includes(user.role)) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">🚫</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-6">
              You don't have permission to access this page.
            </p>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
  }

  // Render protected content
  return children;
};

export default ProtectedRoute;