export const mapApiMovie = (movie) => ({
  _id: String(movie.id),
  id: movie.id,
  title: movie.title || 'Untitled',
  overview: movie.overview || 'No overview available.',
  poster_path: movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image',
  backdrop_path: movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : 'https://via.placeholder.com/600x300?text=No+Backdrop',
  casts: [], // API movies don't have cast info
  release_date: movie.release_date || '2025-01-01',
  original_language: movie.original_language || 'en',
  tagline: movie.tagline || '',
  vote_average: movie.vote_average || 0,
  vote_count: movie.vote_count || 0,
  runtime: movie.runtime || 120,
  genres: movie.genre_ids ? movie.genre_ids.map((id) => ({ id, name: 'Genre' })) : [],
  // <-- Add default dateTime here for SeatLayout
  dateTime: {
    '2025-06-30': [
      { time: '2025-06-30T02:30:00.000Z' },
      { time: '2025-06-30T05:00:00.000Z' },
      { time: '2025-06-30T08:00:00.000Z' },
    ],
  },
});
