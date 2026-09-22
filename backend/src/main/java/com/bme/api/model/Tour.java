package com.bme.api.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
public class Tour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(unique = true, nullable = false)
    public String slug;

    public String title;
    public String titleEs;
    public String category;
    public String categoryEs;
    public String destination;
    public String destinationEs;
    public String duration;
    public String durationEs;
    public String imageUrl;
    public String route;
    public String routeEs;
    public BigDecimal price;

    @Column(length = 1000)
    public String shortDescription;
    @Column(length = 1000)
    public String shortDescriptionEs;
    @Column(length = 5000)
    public String description;
    @Column(length = 5000)
    public String descriptionEs;
    @Column(length = 7000)
    public String itinerary;
    @Column(length = 7000)
    public String itineraryEs;
}
