import ReservationForm from "./ReservationForm";
import ReservationList from "./ReservationList";

function App() {
  return (
    <div className="flex justify-center items-center h-screen border-2 border-black">
      <div className="flex justify-center items-center h-full w-full p-10">
        <ReservationForm />
      </div>
      <div className="w-1 h-[95%] bg-black"></div>
      <div className="flex justify-center items-center h-full w-full p-10">
        <ReservationList />
      </div>
    </div>
  );
}

export default App;
