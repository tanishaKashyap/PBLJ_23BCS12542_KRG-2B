import React, { useEffect, useState } from 'react';
import { dummyBookingData } from '../assets/assets';
import BlurCircle from '../Components/BlurCircle';
import timeFormat from '../lib/timeFormat';
import { dateFormat } from '../lib/dateFormat';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch bookings without duplicates
  const getMyBookings = () => {
    const storedBookings = JSON.parse(localStorage.getItem('myBookings')) || [];

    // Only add dummy bookings if not already in storage
    const combinedBookings = storedBookings.length
      ? storedBookings
      : dummyBookingData.map(b => ({ ...b, paid: false, processing: false }));

    setBookings(combinedBookings);
    localStorage.setItem('myBookings', JSON.stringify(combinedBookings));
    setIsLoading(false);
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  // Handle "Pay Now"
  const handlePay = (index) => {
    setBookings(prev =>
      prev.map((b, i) => (i === index ? { ...b, processing: true } : b))
    );

    setTimeout(() => {
      setBookings(prev => {
        const updated = prev.map((b, i) =>
          i === index ? { ...b, paid: true, processing: false } : b
        );
        localStorage.setItem('myBookings', JSON.stringify(updated));
        return updated;
      });
      toast.success('Payment Successful!');
    }, 2000); // 2 seconds delay to simulate payment
  };

  // Handle "Delete Booking"
  const handleDelete = (index) => {
    const updated = bookings.filter((_, i) => i !== index);
    setBookings(updated);
    localStorage.setItem('myBookings', JSON.stringify(updated));
    toast.success('Booking Deleted!');
  };

  if (isLoading) {
    return (
      <div className="relative px-6 md:px-16 lg:px-40 xl:px-44 pt-10 min-h-[80vh] flex items-center justify-center overflow-hidden">
        <p className="text-lg text-white text-center w-full">Loading...</p>
        <BlurCircle top="-10rem" left="-12rem" color="255,72,101" size="32rem" opacity={0.25} />
        <BlurCircle top="15rem" right="-20rem" color="255,72,101" size="40rem" opacity={0.2} />
        <BlurCircle bottom="-12rem" left="10rem" color="255,72,101" size="28rem" opacity={0.15} />
        <BlurCircle bottom="8rem" right="5rem" color="255,72,101" size="24rem" opacity={0.2} />
      </div>
    );
  }

  return (
    <div className="relative px-6 md:px-16 lg:px-40 xl:px-44 pt-10 min-h-[80vh] overflow-hidden">
      <BlurCircle top="-10rem" left="-12rem" color="255,72,101" size="32rem" opacity={0.25} />
      <BlurCircle top="15rem" right="-20rem" color="255,72,101" size="40rem" opacity={0.2} />
      <BlurCircle bottom="-12rem" left="10rem" color="255,72,101" size="28rem" opacity={0.15} />
      <BlurCircle bottom="8rem" right="5rem" color="255,72,101" size="24rem" opacity={0.2} />

      <h1 className="text-lg font-medium my-4 text-white">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-gray-400 text-center my-10">No bookings available</div>
      ) : (
        <div className="flex flex-col gap-6">
          {bookings.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col md:flex-row bg-[#09090B] border border-red-600 rounded-lg p-4 shadow-md max-w-3xl"
            >
              {/* Movie Poster */}
              <img
                src={item.show.movie.poster_path || '/placeholder.png'}
                alt={item.show.movie.title || 'Movie Poster'}
                className="md:w-44 aspect-video h-auto object-cover object-bottom rounded"
              />

              {/* Movie Info */}
              <div className="flex flex-col p-4 flex-1">
                <p className="text-white text-lg font-semibold">
                  {item.show.movie.title || 'Unknown Title'}
                </p>
                <p className="text-gray-400 text-sm">
                  {item.show.movie.runtime
                    ? timeFormat(item.show.movie.runtime)
                    : 'Unknown Duration'}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  {item.show.showDateTime
                    ? dateFormat(item.show.showDateTime)
                    : 'Unknown Date'}
                </p>
              </div>

              {/* Right side: Total Tickets, Seats & Buttons */}
              <div className="flex flex-col justify-between items-end p-4 text-right">
                <p className="text-sm text-gray-300">
                  <span className="text-gray-400">Total Tickets:</span> {item.bookedSeats.length}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="text-gray-400">Seat Number:</span> {item.bookedSeats.join(', ')}
                </p>

                {/* Button Row */}
                <div className="flex gap-2 mt-4">
                  {/* Pay Now or Paid */}
                  {item.paid ? (
                    <div className="px-4 py-3 bg-black bg-opacity-60 text-white rounded-full">
                      Paid
                    </div>
                  ) : (
                    <button
                      onClick={() => handlePay(index)}
                      disabled={item.processing}
                      className="px-4 py-3 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-transform hover:scale-105 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {item.processing ? 'Processing...' : 'Pay Now'}
                    </button>
                  )}

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(index)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-900 text-red-500 transition"
                    title="Delete Booking"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
