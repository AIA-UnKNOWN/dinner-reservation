const ReservationList = () => {
  return (
    <div className="w-full h-full border-2 border-black p-4 rounded-md">
      <p className="text-3xl font-bold mb-4">Reservation List</p>
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-gray-200 text-center">ID</th>
            <th className="px-4 py-2 bg-gray-200 text-center">Name</th>
            <th className="px-4 py-2 bg-gray-200 text-center">Phone No.</th>
            <th className="px-4 py-2 bg-gray-200 text-center">No. of Guests</th>
            <th className="px-4 py-2 bg-gray-200 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 text-center">1</td>
            <td className="px-4 py-2 text-center">John Doe</td>
            <td className="px-4 py-2 text-center">23498237</td>
            <td className="px-4 py-2 text-center">3</td>
            <td className="px-4 py-2 text-center">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Edit
              </button>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 text-center">2</td>
            <td className="px-4 py-2 text-center">Jane Smith</td>
            <td className="px-4 py-2 text-center">98765432</td>
            <td className="px-4 py-2 text-center">2</td>
            <td className="px-4 py-2 text-center">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Edit
              </button>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 text-center">3</td>
            <td className="px-4 py-2 text-center">Bob Johnson</td>
            <td className="px-4 py-2 text-center">12345678</td>
            <td className="px-4 py-2 text-center">5</td>
            <td className="px-4 py-2 text-center">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Edit
              </button>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 text-center">4</td>
            <td className="px-4 py-2 text-center">Alice Brown</td>
            <td className="px-4 py-2 text-center">87654321</td>
            <td className="px-4 py-2 text-center">4</td>
            <td className="px-4 py-2 text-center">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;
