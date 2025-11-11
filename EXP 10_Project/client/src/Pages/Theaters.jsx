import React, { useState, useEffect } from "react";
import { dummyShowsData, dummyDateTimeData } from "../assets/assets";

const Theaters = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const theatersWithMovies = dummyShowsData.map((movie) => ({
      ...movie,
      dateTime: dummyDateTimeData,
    }));
    setShows(theatersWithMovies);
    setLoading(false);
  }, []);

  if (loading)
    return <div className="text-center mt-20 text-gray-400">Loading shows...</div>;

  return (
    <div className="mt-20 px-6 md:px-16 lg:px-36">
      <h1 className="text-3xl font-bold mb-8 text-white">TRAILERS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {shows.map((movie) => (
          <div
            key={movie._id}
            className="bg-black bg-opacity-60 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition m-1"
          >
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="w-full h-80 object-contain bg-gray-800"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-white">{movie.title}</h2>
              <p className="text-gray-300 text-sm mt-2">{movie.tagline}</p>
              <a
                href={movie.trailer || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Watch Trailer
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Theaters;
