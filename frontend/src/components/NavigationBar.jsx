import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
function NavigationBar() {
  const { user, setUser, setToken } = useContext(AuthContext);
  const navigator = useNavigate();
  const location = useLocation();
  const isAdminPage = location.pathname.includes("/admin");
  if (!user) return null;

  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem("login-user");
    sessionStorage.removeItem("access-token");
    navigator("/login");
  };

  return (
    <div>
      <div className="flex justify-between p-6 shadow-2xl bg-white text-black">
        <h1 className="font-bold text-xl">
          {isAdminPage ? "Admin Dashboard" : "Event Booking & Ticketing"}
        </h1>
        <div>
          <ul className="flex gap-8 pr-2">
            {user?.role === "admin" && isAdminPage && (
              <button
                onClick={() => navigator("/home")}
                className="cursor-pointer"
              >
                <li>Home</li>
              </button>
            )}
            <li>Events</li>
            <li>Profile</li>
            <button onClick={logout} className="cursor-pointer">
              <li>Logout</li>
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
