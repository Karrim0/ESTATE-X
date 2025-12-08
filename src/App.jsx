import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "./components/common/Header";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { FullPageLoader } from "./components/common/LoadingStates";
import { AppProvider } from "./context/AppContext";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const PropertyDetails = lazy(() => import("./pages/PropertyDetails"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Saved = lazy(() => import("./pages/Saved"));

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              <Suspense fallback={<FullPageLoader message="Loading page..." />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/property/:id" element={<PropertyDetails />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/saved" element={<Saved />} />
                  <Route path="/analytics" element={<Dashboard />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </Router>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
