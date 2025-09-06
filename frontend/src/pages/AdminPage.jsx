import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import NavigationBar from "../components/NavigationBar";
import { useEvents } from "../contexts/EventContext";
import { useNavigate, useLocation } from "react-router-dom";
import EventForm from "../components/EventForm";
import { getEventById } from "../utils/fetchEventUtils";

function AdminPage() {
  const { token } = useContext(AuthContext);
  const { events, loading, deleteEvent, addEvent, editEvent } = useEvents();
  const navigator = useNavigate();
  const locations = useLocation();
  const isOpenAddForm = locations.pathname.includes("/admin/event/add");
  const isOpenEditForm = locations.pathname.includes("/admin/event/edit/");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [price, setPrice] = useState(null);
  const [ticketCapacity, setTicketCapacity] = useState(null);
  const [idToEdit, setIdToEdit] = useState(null);
  if (loading) {
    return <div>Loading events...</div>;
  }
  let eventData = {
    title: title,
    description: description,
    location: location,
    startDateTime: `${startDate}T${startTime}:00Z`,
    endDateTime: `${endDate}T${endTime}:00Z`,
    price: price,
    ticketCapacity: ticketCapacity,
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setLocation("");
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
    setPrice(null);
    setTicketCapacity(null);
  };

  const save = async () => {
    console.log(eventData);
    if (locations.pathname.includes("/edit")) {
      await editEvent(idToEdit, eventData, token);
    } else if (locations.pathname.includes("/add")) {
      await addEvent(eventData, token);
    }
    navigator("/admin");
    clearForm();
  };

  const openEditForm = async (id) => {
    navigator(`/admin/event/edit/${id}`);
    setIdToEdit(id)
    try {
      const event = await getEventById(id);

      const startDate = `${event.startDateTime.split("T")[0]}`;
      const endDate = event.endDateTime.split("T")[0];
      const startTime = event.startDateTime.split("T")[1].slice(0, 5);
      const endTime = event.endDateTime.split("T")[1].slice(0, 5);
      setTitle(event.title);
      setDescription(event.description);
      setLocation(event.location);
      setStartDate(startDate);
      setEndDate(endDate);
      setStartTime(startTime);
      setEndTime(endTime);
      setPrice(event.price);
      setTicketCapacity(event.ticketCapacity);
    } catch (err) {
      console.error("Error fetching event:", err.message);
    }
  };

  const cancel = () => {
    clearForm();
    navigator("/admin");
  };

  return (
    <div>
      <NavigationBar />
      <div className="relative">
        <div className="m-10">
          <h1 className="text-2xl font-bold mb-5">Admin Dashboard</h1>
        </div>
        {(isOpenAddForm || isOpenEditForm) && (
          <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50">
            <EventForm
              eventData={eventData}
              save={save}
              cancel={cancel}
              setTitle={setTitle}
              setDescription={setDescription}
              setLocation={setLocation}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              setPrice={setPrice}
              setTicketCapacity={setTicketCapacity}
              startTime={startTime}
              startDate={startDate}
              endTime={endTime}
              endDate={endDate}
            />
          </div>
        )}
        <div className="m-10">
          <h1 className="text-2xl font-bold mb-5">Event Management</h1>
          <button
            className="btn btn-primary py-1 mb-5"
            onClick={() => navigator("/admin/event/add")}
          >
            Add Event
          </button>
          <table className="table-auto border-collapse border font-semibold border-gray-200 w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className=" px-2 py-3">Title</th>
                <th className=" px-4 py-2">Location</th>
                <th className=" px-2 py-2">Date</th>
                <th className=" px-2 py-2">End Date</th>
                <th className=" px-2 py-2">Time</th>
                <th className=" px-[2px] py-2">Tickets</th>
                <th className="  py-2">Booked</th>
                <th className="  py-2">Available</th>
                <th className=" px-4 py-2">Price</th>
                <th className=" px-2 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {events.length > 0 ? (
                events.map((event) => (
                  <tr key={event._id}>
                    <td className="px-2 py-2">{event.title}</td>
                    <td className="px-4 py-2">{event.location}</td>
                    <td className="px-2 py-2">{event.date}</td>
                    <td className="px-4 py-2">{event.endDate}</td>
                    <td className="px-2 py-2">{event.time}</td>
                    <td className="py-2">{event.ticketCapacity}</td>
                    <td className="py-2">{event.ticketBooked}</td>
                    <td className="py-2">{event.ticketsAvailable}</td>
                    <td className="px-4 py-2">{event.price} ฿</td>

                    <td className="px-2 py-2">
                      <button
                        className="btn btn-sm btn-primary mr-2"
                        onClick={() => openEditForm(event._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-error text-white"
                        onClick={() => deleteEvent(event._id, token)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-5">
                    No events found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
