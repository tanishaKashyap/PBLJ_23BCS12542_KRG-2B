import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";
import BlurCircle from "../Components/BlurCircle";
import { Heart, PlayCircleIcon } from "lucide-react";
import DateSelect from "../Components/DateSelect";
import MovieCard from "../Components/MovieCard";
import Loading from "../Components/Loading";
import { useAppContext } from "../context/AppContext";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";

const TMDB_API_KEY = "347f4dbb93c0bfa8a530ad56c717a4e5";

const timeFormat = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

const MovieDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  const { favoriteMovies, toggleFavorite } = useAppContext();

  // Fetch movie details
  const getShow = async () => {
    try {
      const resMovie = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`
      );
      const movie = await resMovie.json();

      const resCredits = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_API_KEY}&language=en-US`
      );
      const credits = await resCredits.json();

      const casts = credits.cast.slice(0, 12).map((c) => ({
        id: c.id,
        name: c.name,
        profile_path: c.profile_path
          ? `https://image.tmdb.org/t/p/original${c.profile_path}`
          : "https://via.placeholder.com/100x100?text=No+Image",
      }));

      const mappedMovie = {
        _id: movie.id,
        title: movie.title || "Untitled",
        overview: movie.overview || "No overview available.",
        poster_path: movie.poster_path
          ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
          : "https://via.placeholder.com/300x450?text=No+Image",
        backdrop_path: movie.backdrop_path
          ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
          : "https://via.placeholder.com/600x300?text=No+Backdrop",
        casts,
        release_date: movie.release_date || "2025-01-01",
        original_language: movie.original_language || "en",
        vote_average: movie.vote_average || 0,
        vote_count: movie.vote_count || 0,
        runtime: movie.runtime || 120,
        genres: movie.genres || [],
      };

      setShow({ movie: mappedMovie, dateTime: dummyDateTimeData });
    } catch (error) {
      console.error(error);
      const foundShow = dummyShowsData.find((s) => s._id === id);
      if (foundShow) setShow({ movie: foundShow, dateTime: dummyDateTimeData });
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  if (!show) return <Loading />;

  const isFavorite = favoriteMovies.some((m) => m._id === show.movie._id);

  return (
    <div className="px-6 md:px-16 lg:px-40 py-10 md:py-16 min-h-screen">
      {/* Main Movie Section */}
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <img
          src={show.movie.poster_path}
          alt={show.movie.title}
          className="max-md:mx-auto rounded-xl h-[26rem] max-w-[17rem] object-cover"
        />
        <div className="relative flex flex-col gap-3">
          <BlurCircle top="-100px" left="-100px" />
          <p className="text-red-500 font-semibold tracking-wide uppercase">ENGLISH</p>
          <h1 className="text-4xl font-semibold max-w-96 text-balance">{show.movie.title}</h1>
          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>
          <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">{show.movie.overview}</p>
          <p className="text-gray-300 text-sm mt-3">
            {timeFormat(show.movie.runtime)} · {show.movie.genres.map((g) => g.name).join(", ")} ·{" "}
            {show.movie.release_date.split("-")[0]}
          </p>

          <div className="flex gap-4 mt-4">
            {/* Watch Trailer */}
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-md">
              <PlayCircleIcon className="w-5 h-5" /> Watch Trailer
            </button>

            {/* Buy Tickets: Scrolls DateSelect to center */}
            <button
              onClick={() => {
                const dateSection = document.getElementById("dateSelect");
                if (dateSection) {
                  const offset =
                    dateSection.getBoundingClientRect().top +
                    window.scrollY -
                    window.innerHeight / 2 +
                    dateSection.offsetHeight / 2;
                  window.scrollTo({ top: offset, behavior: "smooth" });
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
            >
              Buy Tickets
            </button>

            {/* Favorite Heart */}
            <button
              onClick={() => toggleFavorite(show.movie)}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition ${
                isFavorite ? "bg-red-500 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-900"
              }`}
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Favorite Cast */}
      <p className="text-lg font-medium mt-20">Your Favorite Cast</p>
      <div className="overflow-x-auto mt-8 pb-4 hide-scrollbar">
        <div className="flex items-center gap-4 w-max px-4">
          {show.movie.casts.map((cast, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={cast.profile_path}
                alt={cast.name}
                className="rounded-full h-20 md:h-20 aspect-square object-cover"
              />
              <p className="font-medium text-xs mt-3">{cast.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* DateSelect with centered scroll */}
      <div id="dateSelect">
        <DateSelect dateTime={show.dateTime} id={id} />
      </div>

      {/* You May Also Like */}
      <p className="text-lg font-medium mt-20 mb-4">You May Also Like</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dummyShowsData.slice(0, 8).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
