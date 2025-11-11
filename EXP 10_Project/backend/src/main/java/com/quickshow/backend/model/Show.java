package com.quickshow.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "shows")
public class Show {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String date;
    private String time;
    private String theaterName;
    private float price;
    private String genre;  // ✅ Added genre field

    // Constructors
    public Show() {}

    public Show(String title, String description, String date, String time, String theaterName, float price, String genre) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.time = time;
        this.theaterName = theaterName;
        this.price = price;
        this.genre = genre;
    }

    // Getters and setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }

    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public String getDate() { return date; }

    public void setDate(String date) { this.date = date; }

    public String getTime() { return time; }

    public void setTime(String time) { this.time = time; }

    public String getTheaterName() { return theaterName; }

    public void setTheaterName(String theaterName) { this.theaterName = theaterName; }

    public float getPrice() { return price; }

    public void setPrice(float price) { this.price = price; }

    public String getGenre() { return genre; }

    public void setGenre(String genre) { this.genre = genre; }
}
