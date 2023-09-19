import { useLoaderData } from "react-router-dom";
import useEditReservation from "./EditReservation.hook";

const EditReservation = () => {
  const editReservationParams = useLoaderData();
  const reservationId = editReservationParams?.reservationId || null;
  const {
    updateReservation,
    isLoading,
    // Reservation Details
    reservationFirstName,
    setReservationFirstName,
    reservationLastName,
    setReservationLastName,
    phoneNumber,
    setPhoneNumber,
    numberOfGuests,
    setNumberOfGuests,
    reservationDate,
    setReservationDate,
  } = useEditReservation({
    reservationId,
  });

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-10">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => window.history.back()}
      >
        Go Back
      </button>
      <form
        className="border-2 border-black p-4 rounded-md w-[500px] mx-auto"
        onSubmit={updateReservation}
      >
        <p className="text-3xl font-bold mb-4">Edit Reservation</p>
        <div className="grid grid-cols-1 gap-4">
          <input
            className="border rounded-md p-2"
            type="text"
            name="reservation_first_name"
            placeholder="First Name"
            value={reservationFirstName}
            onChange={(e) => setReservationFirstName(e.target.value)}
            required
          />
          <input
            className="border rounded-md p-2"
            type="text"
            name="reservation_last_name"
            placeholder="Last Name"
            value={reservationLastName}
            onChange={(e) => setReservationLastName(e.target.value)}
            required
          />
          <input
            className="border rounded-md p-2"
            type="number"
            name="phone_number"
            placeholder="Phone Number"
            value={phoneNumber || 0}
            onChange={(e) => setPhoneNumber(parseInt(e.target.value))}
            required
          />
          <input
            className="border rounded-md p-2"
            type="number"
            name="number_of_guests"
            placeholder="No. of Guests"
            value={numberOfGuests || 0}
            onChange={(e) => setNumberOfGuests(parseInt(e.target.value))}
            required
          />
          <input
            className="border rounded-md p-2"
            type="date"
            name="reservation_datetime"
            placeholder="Reservation Date"
            value={reservationDate || undefined}
            onChange={(e) => setReservationDate(e.target.value)}
            required
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditReservation;
