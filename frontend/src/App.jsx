import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthForm from "@auth/pages/AuthForm";
import VerifyEmail from "@auth/pages/VerifyEmailPage";
import EventListPage from "@events/pages/EventListPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminPage from "@users/pages/AdminPage";
import ProfilePage from "@users/pages/ProfilePage";
import MyTicketPage from "@booking/pages/MyTicketPage";

function App() {
  return (
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
                <EventListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-tickets"
            element={
              <ProtectedRoute>
                <MyTicketPage />
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
  );
}

export default App;
