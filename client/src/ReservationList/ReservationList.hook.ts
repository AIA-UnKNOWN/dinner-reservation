import { useEffect, useState } from "react";
import useReservationStore from "../states/reservations.state";
import Swal from "sweetalert2";

const useReservationList = () => {
  const reservationStore = useReservationStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getReservations();
  }, []);

  const getReservations = async () => {
    setIsLoading(true);
    try {
      await reservationStore.getAll();
    } catch (error) {
      console.log("GetReservationsError", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteReservation = async (reservationId: number) => {
    if (!reservationId) return;
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const response = await fetch(
          `http://localhost:5000/reservation/${reservationId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          Swal.fire(
            "Deleted!",
            "Your reservation has been deleted.",
            "success"
          );
          getReservations();
        }
      }
    } catch (error) {
      console.log("DeleteReservationError", error);
    }
  };

  const filterReservations = () => {
    // Check if there are reservations in the store
    if (reservationStore.data.length === 0) return [];
    // Get the current date and time
    const currentDate = new Date();
    // Map and process each reservation
    return reservationStore.data.map((reservation) => {
      // Convert the reservation date to a Date object
      let reservationDateTime = new Date(reservation["reservation_datetime"]);
      // Calculate the time difference in milliseconds between reservation date and current date
      const timeDifferenceInMilliseconds = reservationDateTime - currentDate;
      // Convert the time difference from milliseconds to days
      /*
        1000 - milliseconds in second
        60 - seconds in minute
        60 - minutes in hour
        24 - hour in a day
      */
      const timeDifferenceInDays =
        timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24);
      // Determine if the reservation can be edited (more than or equal to 2 days difference)
      const canEdit = timeDifferenceInDays >= 2;
      // Return the reservation with 'canEdit' property
      return {
        ...reservation,
        canEdit,
      };
    });
  };

  return {
    reservations: filterReservations(),
    isLoading,
    deleteReservation,
  };
};

export default useReservationList;
