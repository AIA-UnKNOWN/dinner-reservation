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

  return {
    reservations: reservationStore.data,
    isLoading,
  };
};

export default useReservationList;
