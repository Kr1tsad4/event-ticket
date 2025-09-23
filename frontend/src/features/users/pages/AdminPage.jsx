import { useContext, useState } from "react";
import { AuthContext } from "@auth/stores/AuthContext";
import NavigationBar from "@components/NavigationBar";
import { useEvent } from "@events/hooks/useEvent";
import { useNavigate, useLocation } from "react-router-dom";
import EventForm from "@events/components/EventForm";
import { getEventById } from "@events/services/fetchEventUtils";
import Charts from "../components/Charts";

function AdminPage() {
  const { token } = useContext(AuthContext);
  const { events, loading, deleteEvent, addEvent, editEvent } = useEvent();
  const navigator = useNavigate();
  const locations = useLocation();
  const isOpenAddForm = locations.pathname.includes("/admin/event/add");
  const isOpenEditForm = locations.pathname.includes("/admin/event/edit/");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [price, setPrice] = useState(null);
  const [ticketCapacity, setTicketCapacity] = useState(null);
  const [idToEdit, setIdToEdit] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [isOpenDeleteConfirmation, setIsOpenDeleteConfirmation] =
    useState(false);

  const eventData = {
    title,
    description,
    location,
    startDateTime: `${startDate}T${startTime}:00Z`,
    endDateTime: `${startDate}T${endTime}:00Z`,
    price,
    ticketCapacity,
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setLocation("");
    setStartDate("");
    setStartTime("");
    setEndTime("");
    setPrice(null);
    setTicketCapacity(null);
  };

  const save = async () => {
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
    setIdToEdit(id);
    try {
      const event = await getEventById(id);
      const startDate = event.startDateTime.split("T")[0];
      const startTime = event.startDateTime.split("T")[1].slice(0, 5);
      const endTime = event.endDateTime.split("T")[1].slice(0, 5);
      setTitle(event.title);
      setDescription(event.description);
      setLocation(event.location);
      setStartDate(startDate);
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

  const openDeleteConfirmationPopup = (id, title) => {
    setEventToDelete({ id: id, title: title });
    setIsOpenDeleteConfirmation(true);
  };

  const enableAddButton = () => {
    return (
      !!title &&
      !!location &&
      !!startDate &&
      !!startTime &&
      !!endTime &&
      !!price
    );
  };

  return (
    <div className="bg-white text-black h-screen pt-20">
      <NavigationBar />
      <div className="relative bg-white">
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
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              setPrice={setPrice}
              setTicketCapacity={setTicketCapacity}
              startTime={startTime}
              startDate={startDate}
              endTime={endTime}
              enableAddButton={enableAddButton}
            />
          </div>
        )}
        {isOpenDeleteConfirmation && (
          <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-[3px] z-50">
            <div className="bg-white w-auto p-5 rounded-xl">
              <h1 className="font-bold text-xl">Delete Confirmation</h1>
              <p className="pb-5 pt-4">
                Are you sure you want to delete {eventToDelete?.title} event ?
              </p>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => {
                    setIsOpenDeleteConfirmation(false);
                    setEventToDelete(null);
                  }}
                  className="btn bg-gray-400 text-black border-0"
                >
                  Cancel
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => {
                    deleteEvent(eventToDelete.id, token);
                    setIsOpenDeleteConfirmation(false);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="m-10">
          <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
          <Charts events={events} />
        </div>
        <div className="m-10">
          <h1 className="text-2xl font-bold mb-5">Event Management</h1>
          <button
            className="btn btn-primary py-1 mb-5"
            onClick={() => navigator("/admin/event/add")}
          >
            New Event
          </button>
          <div className="overflow-x-auto">
            <table className="table-auto min-w-full border-collapse border-gray-200"></table>
            <table className="table-auto border-collapse border font-semibold border-gray-200 w-full text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className=" px-2 py-3">Title</th>
                  <th className=" px-4 py-2">Location</th>
                  <th className=" px-2 py-2">Date</th>
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
                          onClick={() =>
                            openDeleteConfirmationPopup(event._id, event.title)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center w-full py-5 ">
                      No events found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
