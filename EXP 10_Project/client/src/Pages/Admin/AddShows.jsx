import React, { useState, useEffect } from "react";
import Title from "../../Components/Admin/Title";
import Loading from "../../Components/Loading";
import { toast } from "react-hot-toast";
import axios from "axios";

const AddShows = () => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const [apiMovies, setApiMovies] = useState([]);
  const [dummyMovies] = useState([
    { id: "d1", title: "In the Lost Lands" },
    { id: "d2", title: "Until Dawn" },
    { id: "d3", title: "Lilo & Stitch" },
  ]);
  const [allMovies, setAllMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [slots, setSlots] = useState([{ showDateTime: "", showPrice: "" }]);
  const [loading, setLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(true);

  // Fetch TMDb now-playing movies
  const fetchNowPlayingMovies = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`
      );

      const movies = data.results.map((m) => ({
        id: m.id,
        title: m.title,
        image: m.poster_path
          ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
          : "https://via.placeholder.com/300x450?text=No+Image",
        rating: m.vote_average,
      }));

      setApiMovies(movies);
      setAllMovies([...movies, ...dummyMovies]);
    } catch (error) {
      console.error("Error fetching TMDb movies:", error);
      setApiMovies([]);
      setAllMovies([...dummyMovies]);
    } finally {
      setApiLoading(false);
    }
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  const handleSelectMovie = (movie) => setSelectedMovie(movie);

  const handleSlotChange = (index, field, value) => {
    const newSlots = [...slots];
    newSlots[index][field] = value;
    setSlots(newSlots);
  };

  const addSlot = () =>
    setSlots([...slots, { showDateTime: "", showPrice: "", selectedMovie: null }]);
  const removeSlot = (index) =>
    setSlots(slots.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMovie || slots.some((s) => !s.showDateTime || !s.showPrice)) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      console.log("Added show:", { movie: selectedMovie.title, slots });
      toast.success("✅ Show(s) added successfully!");
      setSlots([{ showDateTime: "", showPrice: "", selectedMovie: null }]);
      setSelectedMovie(null);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="px-4 md:px-10 py-6 text-gray-200">
      {/* NOW PLAYING MOVIES */}
      <Title text1="Now Playing" text2="Movies" />
      <div className="mt-6 overflow-x-auto">
        <div className="flex gap-4">
          {apiLoading ? (
            <Loading />
          ) : apiMovies.length === 0 && dummyMovies.length === 0 ? (
            <p className="text-gray-400">No movies found.</p>
          ) : (
            apiMovies.map((movie) => (
              <div
                key={movie.id}
                className={`relative min-w-[12rem] bg-red-900/20 border border-red-900/40 rounded-xl overflow-hidden shadow-md shadow-red-900/30 hover:shadow-red-800/40 transition-all duration-300 cursor-pointer ${
                  selectedMovie?.id === movie.id ? "ring-2 ring-green-400" : ""
                }`}
                onClick={() => handleSelectMovie(movie)}
              >
                {selectedMovie?.id === movie.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white font-bold z-10">
                    ✓
                  </div>
                )}
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-52 object-cover"
                />
                <div className="p-2">
                  <h3 className="text-md font-semibold text-white truncate">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    ⭐ {movie.rating?.toFixed(1)} / 10
                  </p>
                  <p className="text-sm text-gray-400">
                    👁️ {(Math.random() * 10000 + 5000).toFixed(0)} views
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ADD SHOW FORM */}
      <div className="mt-14">
        <Title text1="Add" text2="Shows" />
        <div className="max-w-xl mt-8 mx-auto bg-red-900/20 border border-red-900/40 p-6 rounded-xl shadow-lg shadow-red-900/30 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Movie selection with dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Selected Movie
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={selectedMovie?.title || "Select…"}
                  readOnly
                  className={`flex-1 bg-red-950/30 border border-red-800/50 text-gray-200 p-2.5 rounded-l-md focus:ring-2 focus:ring-red-600 outline-none ${
                    !selectedMovie ? "text-gray-400" : "text-white"
                  }`}
                  required
                />
                {!selectedMovie && (
                  <select
                    className="bg-red-950/30 border border-red-800/50 border-l-0 text-gray-200 rounded-r-md p-2.5 focus:ring-2 focus:ring-red-600 outline-none appearance-none cursor-pointer"
                    value=""
                    onChange={(e) => {
                      const movie = allMovies.find(
                        (m) => m.title === e.target.value
                      );
                      setSelectedMovie(movie);
                    }}
                  >
                    <option value="" disabled hidden />
                    {allMovies.map((movie, idx) => (
                      <option key={idx} value={movie.title}>
                        {movie.title}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* Time Slots */}
            {slots.map((slot, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 text-gray-300">
                    Show Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={slot.showDateTime}
                    onChange={(e) =>
                      handleSlotChange(index, "showDateTime", e.target.value)
                    }
                    className="w-full bg-red-950/30 border border-red-800/50 text-gray-200 rounded-md p-2.5 focus:ring-2 focus:ring-red-600 outline-none"
                    required
                  />
                </div>
                <div className="w-32">
                  <label className="block text-sm font-medium mb-1 text-gray-300">
                    Price ({currency})
                  </label>
                  <input
                    type="number"
                    value={slot.showPrice}
                    onChange={(e) =>
                      handleSlotChange(index, "showPrice", e.target.value)
                    }
                    className="w-full bg-red-950/30 border border-red-800/50 text-gray-200 rounded-md p-2.5 focus:ring-2 focus:ring-red-600 outline-none"
                    min="1"
                    required
                  />
                </div>
                {slots.length > 1 && (
                  <button
                    type="button"
                    className="text-red-500 font-bold text-xl"
                    onClick={() => removeSlot(index)}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              className="text-sm text-green-400 underline"
              onClick={addSlot}
            >
              + Add Another Time Slot
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-800/80 hover:bg-red-700 text-white font-semibold py-2.5 rounded-md mt-4 transition-all duration-200"
            >
              {loading ? "Adding Show..." : "Add Show"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddShows;
