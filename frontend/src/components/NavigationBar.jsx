import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../features/auth/stores/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../features/auth/services/fetchAuthUtils";
import { HiOutlineMenu, HiX } from "react-icons/hi"; // Hamburger icon

function NavigationBar() {
  const { user, setUser, setToken } = useContext(AuthContext);
  const navigator = useNavigate();
  const location = useLocation();
  const isAdminPage = location.pathname.includes("/admin");
  const isHomePage = location.pathname.includes("/events");
  const isProfilePage = location.pathname.includes("/profile");
  const isMyTicketPage = location.pathname.includes("/my-tickets");
  const [navTitle, setNavTitle] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    if (isAdminPage) setNavTitle("Admin Dashboard");
    else if (isProfilePage) setNavTitle("My Profile");
    else if (isMyTicketPage) setNavTitle("My Tickets");
    else setNavTitle("Event Booking & Ticketing");
  }, [location.pathname]);

  const menuItems = (
    <>
      <button
        onClick={() => {
          navigator("/events");
          setIsMobileMenuOpen(false);
        }}
        className="cursor-pointer block px-4 py-2"
      >
        <p className={isHomePage ? "font-bold" : ""}>Events</p>
      </button>
      <button
        onClick={() => {
          navigator("/my-tickets");
          setIsMobileMenuOpen(false);
        }}
        className="cursor-pointer block px-4 py-2"
      >
        <p className={isMyTicketPage ? "font-bold" : ""}>My Tickets</p>
      </button>
      {user?.role === "admin" && (
        <button
          onClick={() => {
            navigator("/admin");
            setIsMobileMenuOpen(false);
          }}
          className="cursor-pointer block px-4 py-2"
        >
          <p className={isAdminPage ? "font-bold" : ""}>Dashboard</p>
        </button>
      )}
      <button
        onClick={() => {
          navigator(`/profile/${user._id}`);
          setIsMobileMenuOpen(false);
        }}
        className="cursor-pointer block px-4 py-2"
      >
        <p className={isProfilePage ? "font-bold" : ""}>Profile</p>
      </button>
      <button
        onClick={() => {
          handleLogout();
          setIsMobileMenuOpen(false);
        }}
        className="cursor-pointer block px-4 py-2"
      >
        Logout
      </button>
    </>
  );

  return (
    <div className="fixed top-0 w-full z-50 bg-white shadow-md text-black">
      <div className="flex justify-between items-center p-4 md:p-6">
        <h1 className="font-bold text-xl">{navTitle}</h1>

        <div className="hidden md:flex gap-6">{menuItems}</div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl"
          >
            {isMobileMenuOpen ? <HiX /> : <HiOutlineMenu />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md flex flex-col">
          {menuItems}
        </div>
      )}
    </div>
  );
}

export default NavigationBar;
