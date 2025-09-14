import NavigationBar from "../components/NavigationBar";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
function ProfilePage() {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-white text-black h-screen pt-20">
      <NavigationBar />
      <div className="m-8 max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>

        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-neutral text-neutral-content rounded-full flex items-center justify-center text-4xl font-bold">
            {user.fullName[0].toUpperCase()}
          </div>
        </div>

        <div className="space-y-4 text-center">
          <p className="text-lg font-semibold">
            Full Name: <span className="font-normal">{user.fullName}</span>
          </p>
          <p className="text-lg font-semibold">
            Email: <span className="font-normal">{user.email}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
