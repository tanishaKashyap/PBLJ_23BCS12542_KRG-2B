import React, { useEffect, useState } from 'react';
import MovieCard from '../Components/MovieCard';
import BlurCircle from '../Components/BlurCircle';
import Loading from '../Components/Loading';
import { dummyShowsData, dummyDateTimeData } from '../assets/assets';

const Movies = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const TMDB_API_KEY = '347f4dbb93c0bfa8a530ad56c717a4e5';

  const fetchApiMovies = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`
      );
      const data = await res.json();

      const movies = data.results.map((movie) => {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        return {
          _id: movie.id,
          title: movie.title || 'Untitled',
          overview: movie.overview || 'No overview available.',
          poster_path: movie.poster_path
            ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
            : 'https://via.placeholder.com/300x450?text=No+Image',
          backdrop_path: movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : 'https://via.placeholder.com/600x300?text=No+Backdrop',
          casts: [], // keep empty
          release_date: movie.release_date || today,
          vote_average: movie.vote_average || 0,
          runtime: movie.runtime || 120,
          genres: movie.genre_ids
            ? movie.genre_ids.map((id) => ({ id, name: 'Genre' }))
            : [],
          dateTime: {
            [today]: dummyDateTimeData, // inject dummy timings
          },
        };
      });

      setAllMovies([...dummyShowsData, ...movies]);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch API movies:', error);
      setAllMovies(dummyShowsData);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiMovies();
  }, []);

  if (loading) return <Loading />;

  return allMovies.length > 0 ? (
    <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]">
      <BlurCircle top="150px" left="0px" />
      <BlurCircle bottom="50px" right="50px" />

      <h1 className="text-lg font-medium my-4">Now Showing</h1>
      <div className="flex flex-wrap max-sm:justify-center gap-8">
        {allMovies.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  ) : (
    <div className="text-center text-gray-400 my-40">No movies available</div>
  );
};

export default Movies;
