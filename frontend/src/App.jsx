import AuthForm from "./auth/AuthForm";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import VerifyEmail from "./pages/VerifyEmail";
import Homepage from "./pages/HomePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminPage from "./pages/AdminPage";
import { EventProvider } from "./contexts/EventContext";

function App() {
  return (
    <EventProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/register" element={<AuthForm />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/event/add"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/event/edit/:id"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </EventProvider>
  );
}

export default App;
