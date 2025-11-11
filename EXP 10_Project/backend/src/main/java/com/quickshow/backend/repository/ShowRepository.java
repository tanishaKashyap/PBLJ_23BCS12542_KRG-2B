package com.quickshow.backend.repository;

import com.quickshow.backend.model.Show;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShowRepository extends JpaRepository<Show, Long> {

    // Find shows by genre
    List<Show> findByGenre(String genre);

}
