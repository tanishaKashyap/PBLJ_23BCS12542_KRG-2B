import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// User Pages
import Home from "./Pages/Home.jsx";
import Movies from "./Pages/Movies.jsx";
import MovieDetails from "./Pages/MovieDetails.jsx";
import SeatLayout from "./Pages/SeatLayout.jsx";
import MyBookings from "./Pages/MyBookings.jsx";
import Favorite from "./Pages/Favorite.jsx";
import Theaters from "./Pages/Theaters.jsx";

// Admin Pages
import Layout from "./Pages/Admin/Layout.jsx";
import Dashboard from "./Pages/Admin/Dashboard.jsx";
import AddShows from "./Pages/Admin/AddShows.jsx";
import ListShows from "./Pages/Admin/ListShows.jsx";
import ListBookings from "./Pages/Admin/ListBookings.jsx";

// Components
import NavBar from "./Components/NavBar.jsx";
import Footer from "./Components/Footer.jsx";
import Releases from "./Pages/Releases.jsx";

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* User Routes */}
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <>
              <NavBar />
              <Movies />
              <Footer />
            </>
          }
        />
        <Route
          path="/movies/:id"
          element={
            <>
              <NavBar />
              <MovieDetails />
              <Footer />
            </>
          }
        />
        <Route
          path="/movies/:id/:date"
          element={
            <>
              <NavBar />
              <SeatLayout />
              <Footer />
            </>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <>
              <NavBar />
              <MyBookings />
              <Footer />
            </>
          }
        />
        <Route
          path="/favorite"
          element={
            <>
              <NavBar />
              <Favorite />
              <Footer />
            </>
          }
        />
        <Route
          path="/theaters"
          element={
            <>
              <NavBar />
              <Theaters />
              <Footer />
            </>
          }
        />

        {/*  Added Releases route */}
        <Route
          path="/releases"
          element={
            <>
              <NavBar />
              <Releases />
              <Footer />
            </>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-shows" element={<AddShows />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-bookings" element={<ListBookings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
