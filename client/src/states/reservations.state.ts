import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Reservation = {
  ID: number;
  reservation_first_name: string;
  reservation_last_name: string;
  phone_number: number;
  number_of_guests: number;
};

interface ReservationState {
  data: Reservation[];
  getAll: () => Promise<void>;
}

const useReservationStore = create<ReservationState>()(
  devtools((set) => ({
    data: [],
    getAll: async () => {
      const response = await fetch(`http://localhost:5000/reservations`);
      if (response.ok) {
        const reservations = await response.json();
        set({ data: reservations });
      }
    },
  }))
);

export default useReservationStore;
