import NavigationBar from "@components/NavigationBar";
import EventList from "@events/components/EventList";
import { useEffect, useState, useContext } from "react";
import { getEventById } from "@events/services/fetchEventUtils";
import { useNavigate } from "react-router-dom";
import BookingConfirmationModal from "@booking/components/BookingConfirmationModal";
import { AuthContext } from "@auth/stores/AuthContext";
import { useEvent } from "@events/hooks/useEvent";

function EventListPage() {
  const { events, bookTicket, fetchEvents } = useEvent(); 
  const [searchValues, setSearchValues] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filterMinPrice, setFilterMinPrice] = useState("");
  const [filterMaxPrice, setFilterMaxPrice] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigator = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSearch = () => {
    const result = events.filter((e) => {
      const matchesSearch = e.title
        .toLowerCase()
        .includes(searchValues.toLowerCase());

      const matchesPrice =
        (!filterMinPrice || e.price >= Number(filterMinPrice)) &&
        (!filterMaxPrice || e.price <= Number(filterMaxPrice));

      const matchesDate = !filterDate || e.plainDate === filterDate;

      const matchesLocation =
        !filterLocation ||
        e.location.toLowerCase().includes(filterLocation.toLowerCase());

      return matchesSearch && matchesPrice && matchesDate && matchesLocation;
    });

    console.log(result);
    setFilteredEvents(result);
    setIsSearching(true);
  };

  const enableSearch = () => {
    return (
      !!searchValues ||
      !!filterMinPrice ||
      !!filterMaxPrice ||
      !!filterDate ||
      !!filterLocation
    );
  };
  const clearFilter = () => {
    setFilteredEvents([]);
    setSearchValues("");
    setFilterMaxPrice("");
    setFilterMinPrice("");
    setFilterDate(null);
    setFilterLocation("");
    setIsSearching(false);
  };
  const [eventTicketToBook, setEventTicketToBook] = useState(null);
  const openConfirmBooking = async (eventId) => {
    const event = await getEventById(eventId);
    if (event) {
      setEventTicketToBook(event);
    }
  };

  const confirmBookTicket = async (eventId, quantity) => {
    await bookTicket(eventId, user._id, quantity);
    setEventTicketToBook(null);
  };

  return (
    <div className="bg-white min-h-screen text-black pb-15 pt-20">
      <NavigationBar />
      <div className="mt-10 ml-25 mr-25">
        <h1 className="text-4xl font-semibold mb-6">Event Listings</h1>
        <div className="flex flex-wrap gap-2 w-full items-center mb-5">
          <input
            type="text"
            placeholder="Search events"
            value={searchValues}
            onChange={(e) => setSearchValues(e.target.value)}
            className="flex-1 px-4 py-2 border bg-gray-300 border-gray-300 shadow rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="Number"
            placeholder="Price lower"
            value={filterMinPrice ?? ""}
            onChange={(e) => setFilterMinPrice(e.target.value)}
            className="w-1/8 px-4 py-2 border bg-gray-300 border-gray-300 shadow rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="Number"
            placeholder="Price upper"
            value={filterMaxPrice ?? ""}
            onChange={(e) => setFilterMaxPrice(e.target.value)}
            className="w-1/8  px-4 py-2 border bg-gray-300 border-gray-300 shadow rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="Date"
            value={filterDate ?? ""}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-1/8 bg-gray-300  px-4 py-2 border text-gray-500 border-gray-300 shadow rounded-md focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Search location"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="px-4 py-2 border bg-gray-300 border-gray-300 shadow rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={!enableSearch()}
          >
            Search
          </button>
          <button
            onClick={clearFilter}
            className="px-4 py-2 btn btn-error text-white rounded-md hover:bg-gray-600"
          >
            Clear
          </button>
        </div>
        {isSearching && (
          <p className="text-gray-500 mb-3">
            Found {filteredEvents.length} event(s)
          </p>
        )}
        <EventList
          events={isSearching ? filteredEvents : events}
          views="list"
          openConfirmBooking={openConfirmBooking}
        />
        {eventTicketToBook && (
          <div className="fixed inset-0 flex justify-center items-center bg-black/20 backdrop-blur-[3px] z-50">
            <BookingConfirmationModal
              eventTicketToBook={eventTicketToBook}
              setEventTicketToBook={setEventTicketToBook}
              confirmBookTicket={confirmBookTicket}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default EventListPage;
