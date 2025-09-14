import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../utils/fetchAuthUtils";
function NavigationBar() {
  const { user, setUser, setToken } = useContext(AuthContext);
  const navigator = useNavigate();
  const location = useLocation();
  const isAdminPage = location.pathname.includes("/admin");
  const isHomePage = location.pathname.includes("/events");
  const isProfilePage = location.pathname.includes("/profile");
  const isMyTicketPage = location.pathname.includes("/my-tickets");
  const [navTitle, setNavTitle] = useState("");
  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setToken(null);
    sessionStorage.removeItem("login-user");
    sessionStorage.removeItem("access-token");
    navigator("/login");
  };

  useEffect(() => {
    if (isAdminPage) {
      setNavTitle("Admin Dashboard");
    } else if (isProfilePage) {
      setNavTitle("My Profile");
    } else if (isMyTicketPage) {
      setNavTitle("My Tickets");
    } else {
      setNavTitle("Event Booking & Ticketing");
    }
  }, []);

  return (
    <div>
      <div className="flex justify-between p-6 shadow-md bg-white text-black fixed top-0 w-full z-50">
        <h1 className="font-bold text-xl">{navTitle}</h1>
        <div className="flex gap-8 pr-2">
          <button
            onClick={() => navigator("/events")}
            className="cursor-pointer"
          >
            <p className={isHomePage ? "font-bold" : ""}>Events</p>
          </button>
          <button
            onClick={() => navigator("/my-tickets")}
            className="cursor-pointer"
          >
            <p className={isMyTicketPage ? "font-bold" : ""}>My Tickets</p>
          </button>
          {user?.role === "admin" && (
            <button
              onClick={() => navigator("/admin")}
              className="cursor-pointer"
            >
              <p className={isAdminPage ? "font-bold" : ""}>Dashboard</p>
            </button>
          )}
          <button
            onClick={() => navigator(`/profile/${user._id}`)}
            className="cursor-pointer"
          >
            <p className={isProfilePage ? "font-bold" : ""}>Profile</p>
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
