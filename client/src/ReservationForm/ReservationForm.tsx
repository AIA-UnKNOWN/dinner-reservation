import useReservation from "./ReservationForm.hook";

const ReservationForm = () => {
  const {
    sumbitReservation,
    isLoading,
    canCreate,
    isInAllowedTimeForReservationCreation,
  } = useReservation();

  if (!isInAllowedTimeForReservationCreation)
    return (
      <p className="text-3xl font-bold mb-4 text-center">
        Sorry, we only accept reservations from 6pm to 9:30pm. Thank you.
      </p>
    );

  if (!canCreate)
    return (
      <p className="text-3xl font-bold mb-4 text-center">
        Sorry, three (3) reservations have already been created. Please try
        again later. Thank you.
      </p>
    );

  return (
    <form
      className="border-2 border-black p-4 rounded-md max-w-md mx-auto"
      onSubmit={sumbitReservation}
    >
      <p className="text-3xl font-bold mb-4">Create Reservation</p>
      <div className="grid grid-cols-1 gap-4">
        <input
          className="border rounded-md p-2"
          type="text"
          name="reservation_first_name"
          placeholder="First Name"
          required
        />
        <input
          className="border rounded-md p-2"
          type="text"
          name="reservation_last_name"
          placeholder="Last Name"
          required
        />
        <input
          className="border rounded-md p-2"
          type="number"
          name="phone_number"
          placeholder="Phone Number"
          required
        />
        <input
          className="border rounded-md p-2"
          type="number"
          name="number_of_guests"
          placeholder="No. of Guests"
          min={1}
          max={5}
          required
        />
        <input
          className="border rounded-md p-2"
          type="date"
          name="reservation_datetime"
          placeholder="Reservation Date"
          min={(() => {
            // Sets the min date to two (2) days from now
            const minimumDate = new Date();
            minimumDate.setDate(minimumDate.getDate() + 2);
            return minimumDate.toISOString().split("T")[0];
          })()}
          required
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;
