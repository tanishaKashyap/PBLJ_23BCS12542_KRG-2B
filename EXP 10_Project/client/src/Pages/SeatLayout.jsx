import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ClockIcon } from 'lucide-react';
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets';
import isoTimeFormat from '../lib/isoTimeFormat';
import { toast } from 'react-hot-toast';
import Loading from '../Components/Loading';
import BlurCircle from '../Components/BlurCircle';

const SeatLayout = () => {
  const { id, date } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([
    'A1', 'A3', 'B2', 'C5', 'D7', 'E1', 'F4'
  ]);

  // Get movie list from location state or fallback to dummy
  const allMovies = location.state?.movie ? [location.state.movie] : dummyShowsData;

  useEffect(() => {
    let foundShow = allMovies.find(m => String(m._id) === id);

    // If not found in allMovies, try fallback: dummyShowsData
    if (!foundShow) {
      foundShow = dummyShowsData.find(m => String(m._id) === id);
    }

    if (!foundShow) return;

    // Ensure dateTime exists
    const dateTime = foundShow.dateTime || dummyDateTimeData;

    // Pick date: either from URL param or first available
    const availableDates = Object.keys(dateTime);
    const selectedDate = date && dateTime[date] ? date : availableDates[0];

    setShow({ movie: foundShow, dateTime, selectedDate });
    setSelectedTime(null);
    setSelectedSeats([]);
  }, [id, allMovies, date]);

  if (!show) return <Loading />;

  const handleTimeSelect = (timeItem) => {
    setSelectedTime(timeItem);
    setSelectedSeats([]);
  };

  const handleSeatClick = (seatId) => {
    if (!selectedTime) return toast.error('Please select time first!');
    if (occupiedSeats.includes(seatId)) return toast.error('Seat already occupied!');
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5)
      return toast.error('You can only select up to 5 seats!');
    
    setSelectedSeats(prev =>
      prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2 justify-center">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`;
        const isSelected = selectedSeats.includes(seatId);
        const isOccupied = occupiedSeats.includes(seatId);

        return (
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId)}
            className={`h-8 w-8 rounded-md border border-red-500 cursor-pointer transition-all ${
              isOccupied
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                : isSelected
                ? 'bg-red-500 text-white'
                : 'hover:bg-red-200 text-gray-700'
            }`}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );

  const handleCheckout = () => {
    if (!selectedTime) return toast.error('Please select time before checkout!');
    if (selectedSeats.length === 0) return toast.error('Please select at least one seat!');

    const booking = {
      show: { movie: show.movie, showDateTime: selectedTime.time },
      bookedSeats: selectedSeats,
      amount: selectedSeats.length * 150,
      isPaid: false
    };

    const currentBookings = JSON.parse(localStorage.getItem('myBookings')) || [];
    currentBookings.push(booking);
    localStorage.setItem('myBookings', JSON.stringify(currentBookings));

    toast.success('Seats booked successfully!');
    navigate('/my-bookings');
  };

  return (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-10 md:pt-16 gap-10">
      {/* Timings */}
      <div className="w-60 border border-red-200 rounded-lg py-6 h-max md:sticky md:top-10">
        <p className="text-lg font-semibold px-6 text-red-700">Available Timings</p>
        <div className="mt-5 space-y-1">
          {show.dateTime[show.selectedDate].map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleTimeSelect(item)}
              className={`flex items-center gap-2 px-6 py-2 w-max cursor-pointer transition ${
                selectedTime?.time === item.time
                  ? 'text-white bg-red-500 rounded-md'
                  : 'text-red-700 hover:text-white hover:bg-red-400 rounded-md'
              }`}
            >
              <ClockIcon className="w-4 h-4" />
              <p className="text-sm">{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seats */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0" right="0" />

        <h1 className="text-2xl font-semibold mb-4 text-red-600">Select your seat</h1>
        <img src={assets.screenImage} alt="screen" />
        <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>

        <div className="flex flex-col items-center mt-10 text-xs text-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
            {["A","B"].map(row => renderSeats(row))}
          </div>
          <div className="grid grid-cols-2 gap-11">
            {[["C","D"],["E","F"],["G","H"],["I","J"]].map((group, idx) => (
              <div key={idx}>{group.map(row => renderSeats(row))}</div>
            ))}
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="mt-10 bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-600 transition shadow-lg"
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  );
};

export default SeatLayout;
