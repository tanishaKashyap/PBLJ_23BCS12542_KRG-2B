import React, { useEffect, useState } from "react";
import axios from "axios";
import { dummyShowsData } from "../../assets/assets"; // dummy movies
import Loading from "../../Components/Loading";
import Title from "../../Components/Admin/Title";

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllBookings = async () => {
    try {
      setLoading(true);

      // 1️⃣ Fetch bookings from your API
      const { data: apiBookings } = await axios.get("/api/booking/all"); // change URL if needed

      // 2️⃣ Map API data into table format
      const formattedApiBookings = (apiBookings?.bookings || []).map((b) => ({
        user: b.user?.name || "Unknown",
        movie: b.show.movie,
        seatNo: (b.bookedSeats || []).join(", "),
        showDateTime: b.show.showDateTime,
        amount: b.amount,
      }));

      // 3️⃣ Add dummy bookings as fallback
      const dummyBookings = [
        {
          user: "tanisha01",
          movie: dummyShowsData[0],
          seatNo: "A1",
          showDateTime: "2025-06-30T02:30:00.000Z",
          amount: 59,
        },
        {
          user: "raj_k",
          movie: dummyShowsData[1],
          seatNo: "B2",
          showDateTime: "2025-06-30T05:00:00.000Z",
          amount: 79,
        },
      ];

      // 4️⃣ Merge API bookings and dummy bookings
      setBookings([...formattedApiBookings, ...dummyBookings]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);

      // fallback to dummy bookings only
      const fallbackBookings = [
        {
          user: "tanisha01",
          movie: dummyShowsData[0],
          seatNo: "A1",
          showDateTime: "2025-06-30T02:30:00.000Z",
          amount: 59,
        },
        {
          user: "raj_k",
          movie: dummyShowsData[1],
          seatNo: "B2",
          showDateTime: "2025-06-30T05:00:00.000Z",
          amount: 79,
        },
      ];
      setBookings(fallbackBookings);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  const dateFormat = (date) =>
    new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  if (loading) return <Loading />;

  return (
    <div className="px-4 md:px-10 py-6 text-gray-200">
      <Title text1="List" text2="Bookings" />

      <div className="max-w-5xl mt-6 overflow-x-auto">
        <table className="w-full border border-red-900/60 rounded-lg overflow-hidden text-sm shadow-md shadow-red-900/40 backdrop-blur-md">
          <thead>
            <tr className="bg-red-900/70 text-left text-white">
              <th className="p-3 font-semibold border-b border-red-800/70 pl-5">
                User
              </th>
              <th className="p-3 font-semibold border-b border-red-800/70">
                Movie Name
              </th>
              <th className="p-3 font-semibold border-b border-red-800/70">
                Seat No.
              </th>
              <th className="p-3 font-semibold border-b border-red-800/70">
                Show Time
              </th>
              <th className="p-3 font-semibold border-b border-red-800/70">
                Amount
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-red-800/60 bg-red-900/20">
            {bookings.map((booking, index) => (
              <tr
                key={index}
                className="hover:bg-red-800/30 transition-colors duration-200"
              >
                <td className="p-3 pl-5">{booking.user}</td>
                <td className="p-3">{booking.movie.title}</td>
                <td className="p-3">{booking.seatNo}</td>
                <td className="p-3">{dateFormat(booking.showDateTime)}</td>
                <td className="p-3">
                  {currency} {booking.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBookings;
