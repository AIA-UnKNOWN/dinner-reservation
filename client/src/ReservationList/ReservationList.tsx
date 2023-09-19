import { Link } from "react-router-dom";
import useReservationList from "./ReservationList.hook";

const ReservationList = () => {
  const { isLoading, reservations } = useReservationList();

  return (
    <div className="w-full h-full border-2 border-black p-4 rounded-md flex flex-col gap-4">
      <p className="text-3xl font-bold">Reservation List</p>
      {isLoading ? (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-200 text-center">ID</th>
                <th className="px-4 py-2 bg-gray-200 text-center">Name</th>
                <th className="px-4 py-2 bg-gray-200 text-center">Phone No.</th>
                <th className="px-4 py-2 bg-gray-200 text-center">
                  No. of Guests
                </th>
                <th className="px-4 py-2 bg-gray-200 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations?.map((reservation) => {
                const id = reservation["ID"];
                const fullName = `${reservation["reservation_first_name"]} ${reservation["reservation_last_name"]}`;
                return (
                  <tr key={id}>
                    <td className="px-4 py-2 text-center">{id}</td>
                    <td className="px-4 py-2 text-center">{fullName}</td>
                    <td className="px-4 py-2 text-center">
                      {reservation["phone_number"]}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {reservation["number_of_guests"]}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {reservation.canEdit ? (
                        <Link
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                          to={`/edit/${reservation.ID}`}
                        >
                          Edit
                        </Link>
                      ) : (
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded opacity-20"
                          disabled
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReservationList;
