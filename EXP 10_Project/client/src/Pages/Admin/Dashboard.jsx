import React, { useState, useEffect } from "react";
import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  UsersIcon,
  StarIcon,
} from "lucide-react";
import Title from "../../Components/Admin/Title";
import BlurCircle from "../../Components/BlurCircle";
import Loading from "../../Components/Loading";
import axios from "axios";

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // Dummy movies
  const dummyShowsData = [
    {
      _id: "324544",
      title: "In the Lost Lands",
      poster_path:
        "https://image.tmdb.org/t/p/original/dDlfjR7gllmr8HTeN6rfrYhTdwX.jpg",
      vote_average: 6.4,
    },
    {
      _id: "1232546",
      title: "Until Dawn",
      poster_path:
        "https://image.tmdb.org/t/p/original/juA4IWO52Fecx8lhAsxmDgy3M3.jpg",
      vote_average: 6.4,
    },
    {
      _id: "552524",
      title: "Lilo & Stitch",
      poster_path:
        "https://image.tmdb.org/t/p/original/mKKqV23MQ0uakJS8OCE2TfV5jNS.jpg",
      vote_average: 7.1,
    },
  ];

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUsers: 0,
  });

  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    { title: "Total Bookings", value: dashboardData.totalBookings || 0, icon: ChartLineIcon },
    { title: "Total Revenue", value: `${currency}${dashboardData.totalRevenue || 0}`, icon: CircleDollarSignIcon },
    { title: "Active Shows", value: dashboardData.activeShows.length || 0, icon: PlayCircleIcon },
    { title: "Total Users", value: dashboardData.totalUsers || 0, icon: UsersIcon },
  ];

  // Fetch TMDB now-playing movies
  const fetchNowPlayingMovies = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`
      );
      const apiMovies = data.results.map((movie) => ({
        _id: movie.id,
        title: movie.title,
        poster_path: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
        vote_average: movie.vote_average,
      }));
      return apiMovies;
    } catch (error) {
      console.error("Error fetching TMDB movies:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const apiMovies = await fetchNowPlayingMovies();
      const combinedMovies = [...dummyShowsData, ...apiMovies]; // Merge dummy + API movies

      // Simulated dashboard data
      const simulatedData = {
        totalBookings: 145,
        totalRevenue: 48250,
        totalUsers: 89,
        activeShows: combinedMovies.map((movie, idx) => ({
          _id: `${movie._id}-${idx}`,
          movie,
          showPrice: 250 + idx * 10,
          showDateTime: new Date(Date.now() + idx * 86400000).toISOString(),
        })),
      };

      setDashboardData(simulatedData);
      setLoading(false);
    };

    loadData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-4 text-gray-100">
      <Title text1="Admin" text2="Dashboard" />

      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {dashboardCards.map((card, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-5 bg-gray-900/60 border border-gray-700 rounded-2xl hover:bg-gray-800/80 transition-all duration-300"
              >
                <div className="p-3 bg-red-600/20 text-red-500 rounded-xl">
                  <card.icon size={26} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{card.title}</p>
                  <p className="text-xl font-semibold text-gray-100">{card.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Active Shows Section */}
          <p className="mt-10 text-lg font-medium">Active Shows</p>
          <div className="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
            <BlurCircle top="100px" left="-10%" />
            {dashboardData.activeShows.map((show) => (
              <div
                key={show._id}
                className="w-56 rounded-lg overflow-hidden bg-gray-900/50 border border-gray-700 hover:border-red-500/60 hover:-translate-y-1 transition duration-300"
              >
                <img src={show.movie.poster_path} alt={show.movie.title} className="h-60 w-full object-cover" />
                <p className="font-medium p-2 truncate">{show.movie.title}</p>
                <div className="flex items-center justify-between px-2">
                  <p className="text-lg font-medium">{currency}{show.showPrice}</p>
                  <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
                    <StarIcon className="w-4 h-4 text-red-500/70 fill-red-500/70" />
                    {show.movie.vote_average.toFixed(1)}
                  </p>
                </div>
                <p className="px-2 pt-2 text-sm text-gray-500">{formatDate(show.showDateTime)}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
