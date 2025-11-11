package com.quickshow.backend.controller;

import com.quickshow.backend.model.Show;
import com.quickshow.backend.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}, allowCredentials = "true")
@RestController
@RequestMapping("/api/shows")
public class ShowController {

    @Autowired
    private ShowService showService;

    // Get all shows
    @GetMapping
    public List<Show> getAllShows() {
        return showService.getAllShows();
    }

    // Get show by ID
    @GetMapping("/{id}")
    public Show getShowById(@PathVariable Long id) {
        return showService.getShowById(id)
                .orElseThrow(() -> new RuntimeException("Show not found"));
    }

    // Add a new show
    @PostMapping
    public Show addShow(@RequestBody Show show) {
        return showService.saveShow(show);
    }

    // Delete a show
    @DeleteMapping("/{id}")
    public String deleteShow(@PathVariable Long id) {
        showService.deleteShow(id);
        return "Show deleted successfully";
    }

    // Get shows by genre
    @GetMapping("/genre/{genre}")
    public List<Show> getShowsByGenre(@PathVariable String genre) {
        return showService.getByGenre(genre);
    }
}
