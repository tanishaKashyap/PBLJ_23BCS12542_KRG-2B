package com.quickshow.backend.controller;

import com.quickshow.backend.model.Favorite;
import com.quickshow.backend.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}, allowCredentials = "true")
@RestController
@RequestMapping("/api/favorites")
public class FavoritesController {

    @Autowired
    private FavoriteService favoriteService;

    @GetMapping("/{userId}")
    public List<Favorite> getUserFavorites(@PathVariable Long userId) {
        return favoriteService.getFavoritesByUserId(userId);
    }

    @PostMapping
    public Favorite addFavorite(@RequestParam Long userId, @RequestParam Long movieId) {
        return favoriteService.addFavorite(userId, movieId);
    }

    @DeleteMapping
    public String deleteFavorite(@RequestParam Long userId, @RequestParam Long movieId) {
        favoriteService.removeFavorite(userId, movieId);
        return "Favorite removed successfully";
    }
}
