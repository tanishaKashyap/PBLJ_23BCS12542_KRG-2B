import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BlurCircle from './BlurCircle';
import { dummyShowsData } from '../assets/assets';
import MovieCard from './MovieCard';

const FeaturedSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Right-side red blur */}
      <BlurCircle top="0" right="-40px" color="255, 0, 0" />

      <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pt-20 pb-10 relative z-10">
          <p className="text-gray-300 font-medium text-lg">Now Showing</p>

          <button
            onClick={() => navigate('/movies')}
            className="group flex items-center gap-2 text-sm text-gray-300 cursor-pointer"
          >
            View All
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className='flex flex-wrap max-sm:justify-center gap-8 mt-8'> 
          {dummyShowsData.slice(0,4).map((show)=>(<MovieCard key={show._id} movie={show}/>))}
        </div>

        {/* Show more button */}
        <div className="flex justify-center mt-20">
          <button
            onClick={() => {
              navigate('/movies');
              window.scrollTo(0, 0);
            }}
            className="
              flex items-center justify-center
              px-10 py-3
              bg-red-500 hover:bg-red-600
              text-white font-medium
              rounded-full
              shadow-lg
              transition-all duration-300
              transform hover:scale-105
              cursor-pointer
            "
          >
            Show more
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
