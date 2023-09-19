import { useState } from "react";
import Swal from "sweetalert2";
import useReservationStore from "../states/reservations.state";

const useReservation = () => {
  const reservationStore = useReservationStore();
  const [isLoading, setIsLoading] = useState(false);

  const sumbitReservation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/reservation`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Reservation has been created",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
        reservationStore.getAll();
      }
    } catch (error) {
      console.log("SumbitReservationError", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sumbitReservation,
    isLoading,
  };
};

export default useReservation;
