package com.quickshow.backend.service;

import com.quickshow.backend.model.Show;
import com.quickshow.backend.repository.ShowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShowService {

    @Autowired
    private ShowRepository showRepository;

    public List<Show> getAllShows() {
        return showRepository.findAll();
    }

    public Optional<Show> getShowById(Long id) {
        return showRepository.findById(id);
    }

    public Show saveShow(Show show) {
        return showRepository.save(show);
    }

    public void deleteShow(Long id) {
        showRepository.deleteById(id);
    }

    // Add this method
    public List<Show> getByGenre(String genre) {
        return showRepository.findByGenre(genre);
    }
}
