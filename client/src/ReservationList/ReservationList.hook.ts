import { useEffect, useState } from "react";
import useReservationStore from "../states/reservations.state";

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
  };
};

export default useReservationList;
