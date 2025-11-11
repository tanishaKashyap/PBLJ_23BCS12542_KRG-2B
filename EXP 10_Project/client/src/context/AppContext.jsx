import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

// Create context
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [shows, setShows] = useState([]); // <-- store all added shows

  // Mock fetch favorites (replace with your backend API if needed)
  const fetchFavoriteMovies = async () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteMovies(storedFavorites);
  };

  const toggleFavorite = (movie) => {
    const exists = favoriteMovies.some((m) => m._id === movie._id);
    let updatedFavorites;
    if (exists) {
      updatedFavorites = favoriteMovies.filter((m) => m._id !== movie._id);
      toast.info("Removed from favorites");
    } else {
      updatedFavorites = [...favoriteMovies, movie];
      toast.success("Added to favorites");
    }
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    fetchFavoriteMovies();
  }, []);

  return (
    <AppContext.Provider
      value={{
        favoriteMovies,
        setFavoriteMovies,
        toggleFavorite,
        shows,
        setShows, // <-- provide shows globally
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
