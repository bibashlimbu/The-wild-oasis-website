"use client";

import ReservationCard from "./ReservationCard";
import { deleteBooking } from "../_lib/action";
import { useOptimistic } from "react";

function ReservationList({ bookings }) {
  const [optimisticBooking, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBooking.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
