package com.quickshow.backend.service;

import com.quickshow.backend.model.Favorite;
import com.quickshow.backend.model.Movie;
import com.quickshow.backend.model.User;
import com.quickshow.backend.repository.FavoriteRepository;
import com.quickshow.backend.repository.MovieRepository;
import com.quickshow.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MovieRepository movieRepository;

    public List<Favorite> getFavoritesByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return favoriteRepository.findByUser(user);
    }

    public Favorite addFavorite(Long userId, Long movieId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        Favorite favorite = new Favorite(user, movie);
        return favoriteRepository.save(favorite);
    }

    public void removeFavorite(Long userId, Long movieId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        favoriteRepository.deleteByUserAndMovieId(user, movieId);
    }
}
