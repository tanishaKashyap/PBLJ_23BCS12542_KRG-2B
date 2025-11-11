import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Components/Loading";
import Title from "../../Components/Admin/Title";
import { useAppContext } from "../../context/AppContext.jsx";

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const { shows: addedShows } = useAppContext(); // Shows added via AddShows
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      setLoading(true);
      const { data: apiShows } = await axios.get("/api/show/all"); // replace with your API

      const formattedApiShows = (apiShows?.shows || []).map((show) => ({
        movie: show.movie,
        showDateTime: show.showDateTime,
        showPrice: show.showPrice,
        occupiedSeats: show.occupiedSeats || {},
      }));

      // Merge API shows + addedShows
      setShows([...formattedApiShows, ...addedShows]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching shows:", error);
      // fallback to only added shows
      setShows([...addedShows]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllShows();
  }, [addedShows]); // refresh when a new show is added

  const dateFormat = (date) =>
    new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  if (loading) return <Loading />;

  return (
    <div className="px-4 md:px-10 py-6 text-gray-200">
      <Title text1="List" text2="Shows" />

      <div className="max-w-5xl mt-6 overflow-x-auto">
        <table className="w-full border border-red-900/60 rounded-lg overflow-hidden text-sm shadow-md shadow-red-900/40 backdrop-blur-md">
          <thead>
            <tr className="bg-red-900/70 text-left text-white">
              <th className="p-3 font-semibold border-b border-red-800/70 pl-5">Movie Name</th>
              <th className="p-3 font-semibold border-b border-red-800/70">Show Time</th>
              <th className="p-3 font-semibold border-b border-red-800/70">Total Bookings</th>
              <th className="p-3 font-semibold border-b border-red-800/70">Earnings</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-red-800/60 bg-red-900/20">
            {shows.map((show, index) => (
              <tr key={index} className="hover:bg-red-800/30 transition-colors duration-200">
                <td className="p-3 pl-5">{show.movie.title}</td>
                <td className="p-3">{dateFormat(show.showDateTime)}</td>
                <td className="p-3">{Object.keys(show.occupiedSeats || {}).length}</td>
                <td className="p-3">
                  {currency} {Object.keys(show.occupiedSeats || {}).length * show.showPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListShows;
