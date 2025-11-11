package com.quickshow.backend.controller;

import com.quickshow.backend.model.Movie;
import com.quickshow.backend.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}, allowCredentials = "true")
@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @GetMapping
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Movie> getMovieById(@PathVariable Long id) {
        return movieRepository.findById(id);
    }

    @PostMapping
    public Movie addMovie(@RequestBody Movie movie) {
        return movieRepository.save(movie);
    }

    @PutMapping("/{id}")
    public Movie updateMovie(@PathVariable Long id, @RequestBody Movie movie) {
        Movie existing = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found"));
        existing.setTitle(movie.getTitle());
        existing.setGenre(movie.getGenre());
        existing.setDescription(movie.getDescription());
        existing.setPosterUrl(movie.getPosterUrl());
        existing.setRating(movie.getRating());
        existing.setLanguage(movie.getLanguage());
        existing.setReleaseDate(movie.getReleaseDate());
        return movieRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public String deleteMovie(@PathVariable Long id) {
        movieRepository.deleteById(id);
        return "Movie deleted successfully!";
    }
}
