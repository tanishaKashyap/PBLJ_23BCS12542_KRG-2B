package com.quickshow.backend.repository;

import com.quickshow.backend.model.Favorite;
import com.quickshow.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUser(User user);
    void deleteByUserAndMovieId(User user, Long movieId);
}
