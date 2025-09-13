import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../utils/fetchAuthUtils";
function NavigationBar() {
  const { user, setUser, setToken } = useContext(AuthContext);
  const navigator = useNavigate();
  const location = useLocation();
  const isAdminPage = location.pathname.includes("/admin");
  const isHomePage = location.pathname.includes("/events");
  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setToken(null);
    sessionStorage.removeItem("login-user");
    sessionStorage.removeItem("access-token");
    navigator("/login");
  };

  return (
    <div>
      <div className="flex justify-between p-6 shadow-md bg-white text-black fixed top-0 w-full z-50">
        <h1 className="font-bold text-xl">
          {isAdminPage ? "Admin Dashboard" : "Event Booking & Ticketing"}
        </h1>
        <div className="flex gap-8 pr-2">
          <button
            onClick={() => navigator("/events")}
            className="cursor-pointer"
          >
            <p className={isHomePage ? "font-bold" : ""}>Events</p>
          </button>

          {user?.role === "admin" && (
            <button
              onClick={() => navigator("/admin")}
              className="cursor-pointer"
            >
              <p className={isAdminPage ? "font-bold" : ""}>Dashboard</p>
            </button>
          )}
          <button>
            <p>Profile</p>
          </button>
          <button onClick={() => handleLogout()} className="cursor-pointer">
            <p>Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
