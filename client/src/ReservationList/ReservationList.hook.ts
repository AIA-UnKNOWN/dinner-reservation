import { useEffect, useState } from "react";

const useReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getReservations();
  }, []);

  const getReservations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/reservations`);
      if (response.ok) {
        const reservations = await response.json();
        setReservations(reservations);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return { reservations, isLoading };
};

export default useReservationList;
