import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useReservationStore from "../states/reservations.state";

const useReservation = () => {
  const reservationStore = useReservationStore();
  const [isLoading, setIsLoading] = useState(false);
  const [canCreate, setCanCreate] = useState(false);
  const [
    isInAllowedTimeForReservationCreation,
    setIsInAllowedTimeForReservationCreation,
  ] = useState(false);

  useEffect(() => {
    checkIfCanCreateReservation();
  }, []);

  const checkIfCanCreateReservation = async () => {
    let canCreate = false;
    try {
      const response = await fetch(
        "http://localhost:5000/reservations/cancreate"
      );
      canCreate = await response.json();
    } catch (error) {
      console.log("CheckIfCanCreateReservationError", error);
    }
    setCanCreate(canCreate);

    const anteMeridiemHours = 12; // a.m.
    const minPostMeridiemHourForReservation = 6; // 6 hour in PM
    const maxPostMeridiemHourForReservation = 9; // 9 hour in PM

    // Creates a date for 6pm
    const minAllowedReservationCreationTime = new Date();
    minAllowedReservationCreationTime.setHours(
      anteMeridiemHours + minPostMeridiemHourForReservation
    ); // Set to 6pm
    minAllowedReservationCreationTime.setMinutes(0); // Set to 6:00pm
    minAllowedReservationCreationTime.setSeconds(0); // Set to 6:00:00pm
    // Creates a date for 9:30pm
    const maxAllowedReservationCreationTime = new Date();
    maxAllowedReservationCreationTime.setHours(
      anteMeridiemHours + maxPostMeridiemHourForReservation
    ); // Set to 9pm
    maxAllowedReservationCreationTime.setMinutes(30); // Set to 9:30pm
    maxAllowedReservationCreationTime.setSeconds(0); // Set to 9:30:00pm
    // Checks if our current date and time is between the allowed to for
    // creating reservation (6pm - 9:30pm)
    const currentDateTime = new Date();
    const isInAllowedTimeForReservationCreation =
      minAllowedReservationCreationTime < currentDateTime &&
      currentDateTime < maxAllowedReservationCreationTime;
    setIsInAllowedTimeForReservationCreation(
      isInAllowedTimeForReservationCreation
    );
  };

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
        checkIfCanCreateReservation();
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
    canCreate,
    isInAllowedTimeForReservationCreation,
  };
};

export default useReservation;
