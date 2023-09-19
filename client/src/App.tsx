import ReservationForm from "./ReservationForm";
import ReservationList from "./ReservationList";

function App() {
  return (
    <div className="flex justify-center items-center h-screen border-2 border-black">
      <div>
        <ReservationForm />
      </div>
      <div>
        <ReservationList />
      </div>
    </div>
  );
}

export default App;
