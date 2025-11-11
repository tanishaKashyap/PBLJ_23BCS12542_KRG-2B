import React, { useState } from 'react';
import { dummyTrailers } from '../assets/assets';
import ReactPlayer from 'react-player';
import BlurCircle from './BlurCircle';
import { PlayCircleIcon } from 'lucide-react';

const TrailerSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);
  const [play, setPlay] = useState(false);

  if (!currentTrailer) return null;

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden relative">
      <p className="text-gray-300 font-medium text-lg max-w-[960px] mx-auto">
        Trailers
      </p>

      <div className="relative mt-6 w-full flex justify-center">
        {/* Right-side red blur */}
        <BlurCircle top="-100px" right="-100px" color="255,0,0" />

        {/* Thumbnail with play button */}
        {!play && (
          <div
            onClick={() => setPlay(true)}
            className="relative cursor-pointer w-[960px] h-[540px] flex items-center justify-center"
          >
            <img
              src={currentTrailer.image}
              alt="Trailer Thumbnail"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bg-red-500 hover:bg-red-600 rounded-full p-6 shadow-lg text-white text-3xl flex items-center justify-center">
              ►
            </div>
          </div>
        )}

        {/* Video player */}
        {play && (
          <ReactPlayer
            url={currentTrailer.videoUrl}
            playing={true}
            controls={true}
            width="960px"
            height="540px"
            className="rounded-lg"
          />
        )}
      </div>

      {/* ✅ Trailer Thumbnails Grid Section */}
      <div className="group grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto">
        {dummyTrailers.map((trailer) => (
          <div
            key={trailer.image}
            className="relative group-hover:not-hover:opacity-50 hover:-translate-y-1 duration-300 transition max-md:h-60 md:max-h-60 cursor-pointer"
            onClick={() => {
              setCurrentTrailer(trailer);
              setPlay(false);
            }}
          >
            <img
              src={trailer.image}
              alt="trailer"
              className="rounded-lg w-full h-full object-cover brightness-75"
            />
            <PlayCircleIcon
              strokeWidth={1.6}
              className="absolute top-1/2 left-1/2 w-5 md:w-8 h-5 md:h-12 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrailerSection;
