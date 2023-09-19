const ReservationForm = () => {
  return (
    <form className="border-2 border-black p-4 rounded-md max-w-md mx-auto">
      <p className="text-3xl font-bold mb-4">Create Reservation</p>
      <div className="grid grid-cols-1 gap-4">
        <input
          className="border rounded-md p-2"
          type="text"
          name="first_name"
          placeholder="First Name"
          required
        />
        <input
          className="border rounded-md p-2"
          type="text"
          name="last_name"
          placeholder="Last Name"
          required
        />
        <input
          className="border rounded-md p-2"
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          required
        />
        <input
          className="border rounded-md p-2"
          type="number"
          name="number_of_guests"
          placeholder="No. of Guests"
          required
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;
