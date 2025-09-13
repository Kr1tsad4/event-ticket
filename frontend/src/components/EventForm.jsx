import { useEffect, useState } from "react";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";

function EventForm({
  eventData,
  save,
  cancel,
  setTitle,
  setDescription,
  setLocation,
  setStartDate,
  setStartTime,
  setEndTime,
  setPrice,
  setTicketCapacity,
  startTime,
  endTime,
  startDate,
  enableAddButton,
}) {
  const navigator = useNavigate();

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md p-6 flex flex-col items-center bg-black/80 rounded-xl shadow-2xl text-white ">
        <h1 className="font-semibold text-2xl mb-5">Add Event</h1>

        <div className="flex flex-col gap-4 w-full">
          <InputField
            type="text"
            placeholder="Enter title"
            label="Title *"
            value={eventData.title}
            handleInput={(e) => setTitle(e)}
          />
          <InputField
            type="text"
            placeholder="Enter description"
            label="Description"
            value={eventData.description}
            handleInput={(e) => setDescription(e)}
          />
          <InputField
            type="text"
            placeholder="Enter location"
            label="Location *"
            value={eventData.location}
            handleInput={(e) => setLocation(e)}
          />

          <InputField
            label="Date *"
            type="date"
            value={startDate}
            handleInput={(e) => setStartDate(e)}
          />

          <div className="flex gap-1">
            <InputField
              label="Start Time *"
              type="time"
              value={startTime}
              handleInput={(e) => setStartTime(e)}
            />
            <InputField
              label="End Time *"
              type="time"
              value={endTime}
              handleInput={(e) => setEndTime(e)}
            />
          </div>
          <div className="flex gap-1">
            <InputField
              type="Number"
              label="Price *"
              placeholder="Enter price"
              value={eventData.price}
              handleInput={(e) => setPrice(e)}
            />
            <InputField
              type="Number"
              label="Number of tickets *"
              placeholder="Enter amount of ticket"
              value={eventData.ticketCapacity}
              handleInput={(e) => setTicketCapacity(e)}
            />
          </div>
        </div>

        <div className="flex gap-2 mt-5 w-full">
          <button className="btn btn-error flex-1" onClick={() => cancel()}>
            Cancel
          </button>
          <button
            className="btn btn-primary flex-1"
            onClick={() => save()}
            disabled={!enableAddButton()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventForm;
