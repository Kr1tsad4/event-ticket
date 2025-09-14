import { useContext, useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import TicketCard from "../components/TicketCard";
import { AuthContext } from "../contexts/AuthContext";
import { useEvents } from "../contexts/EventContext";

function MyTicketPage() {
  const { user } = useContext(AuthContext);
  const [userBookedEvent, setUserBookedEvent] = useState();
  const { fetchUserBookedEvent } = useEvents();
  useEffect(() => {
    const fetchBookedEvent = async () => {
      const res = await fetchUserBookedEvent(user._id);
      setUserBookedEvent(res);
    };
    fetchBookedEvent();
  }, []);
  return (
    <div className="bg-white text-black min-h-screen pt-20">
      <NavigationBar />
      <div className="m-8">
        <h1 className="text-4xl font-bold mb-8">My Tickets</h1>

        <TicketCard userBookedEvent={userBookedEvent} />
      </div>
    </div>
  );
}

export default MyTicketPage;
