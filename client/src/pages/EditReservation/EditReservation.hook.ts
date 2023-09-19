import { useEffect, useState } from "react";
import Swal from "sweetalert2";

type EditReservationHook = {
  reservationId: number | null;
};

const useEditReservation = (props: EditReservationHook) => {
  const { reservationId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [reservationFirstName, setReservationFirstName] = useState("");
  const [reservationLastName, setReservationLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [numberOfGuests, setNumberOfGuests] = useState(0);

  useEffect(() => {
    console.log(reservationId);
    if (reservationId) getReservation(reservationId);
  }, []);

  const updateReservation = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!reservationId) return;
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/reservation/${reservationId}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (response.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Reservation has been updated",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
        setTimeout(() => {
          location.href = "/";
        }, 1000);
      }
    } catch (error) {
      console.log("SumbitReservationError", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getReservation = async (reservationId: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/reservation/${reservationId}`
      );
      if (response.ok) {
        const reservation = await response.json();
        setReservationFirstName(reservation["reservation_first_name"]);
        setReservationLastName(reservation["reservation_last_name"]);
        setPhoneNumber(reservation["phone_number"]);
        setNumberOfGuests(reservation["number_of_guests"]);
      }
    } catch (error) {
      console.log("GetReservationError", error);
    }
  };

  return {
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
  };
};

export default useEditReservation;
