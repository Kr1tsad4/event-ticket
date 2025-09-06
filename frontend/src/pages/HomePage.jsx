import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import NavigationBar from "../components/NavigationBar";

function Homepage() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <NavigationBar />
      <div>Home {user.role}</div>
   
    </div>
  );
}

export default Homepage;
