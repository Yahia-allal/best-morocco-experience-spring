package com.bme.api.config;

import com.bme.api.model.Tour;
import com.bme.api.repository.TourRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.math.BigDecimal;

@Configuration
public class SeedConfig {
    @Bean
    CommandLineRunner seed(TourRepository repository) {
        return args -> {
            upsert(repository, "3-days-marrakech-merzouga",
                    "3 Days Marrakech to Merzouga", "3 días de Marrakech a Merzouga",
                    "Desert Tours", "Tours por el desierto", "Merzouga", "Merzouga",
                    "3 Days / 2 Nights", "3 días / 2 noches", "320",
                    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1400&q=85",
                    "Cross the High Atlas, visit Ait Ben Haddou and sleep beneath Sahara stars.",
                    "Cruza el Alto Atlas, visita Ait Ben Haddou y duerme bajo las estrellas del Sáhara.",
                    "Marrakech → Ait Ben Haddou → Dades → Merzouga", "Marrakech → Ait Ben Haddou → Dades → Merzouga",
                    "A private Sahara journey through kasbahs, valleys and the dunes of Erg Chebbi.",
                    "Un viaje privado al Sáhara entre kasbahs, valles y las dunas de Erg Chebbi.",
                    "Marrakech to Dades via Ait Ben Haddou|Dades to Merzouga via Todra Gorge and camel trek|Sunrise in Merzouga and return journey",
                    "De Marrakech a Dades pasando por Ait Ben Haddou|De Dades a Merzouga por las Gargantas del Todra y paseo en camello|Amanecer en Merzouga y viaje de regreso");

            upsert(repository, "atlas-mountains-day-trip",
                    "Atlas Mountains Day Trip", "Excursión de un día al Atlas",
                    "Day Trips", "Excursiones de un día", "High Atlas", "Alto Atlas",
                    "1 Day", "1 día", "75",
                    "https://images.unsplash.com/photo-1489493512598-d08130f49bea?auto=format&fit=crop&w=1400&q=85",
                    "Mountain villages, panoramic valleys and authentic local life.",
                    "Pueblos de montaña, valles panorámicos y auténtica vida local.",
                    "Marrakech → Imlil → Marrakech", "Marrakech → Imlil → Marrakech",
                    "A relaxed private day in the High Atlas.", "Un día privado y tranquilo en el Alto Atlas.",
                    "Drive from Marrakech to Imlil|Guided village walk and traditional lunch|Scenic return to Marrakech",
                    "Viaje de Marrakech a Imlil|Paseo guiado por el pueblo y almuerzo tradicional|Regreso panorámico a Marrakech");

            upsert(repository, "4-days-marrakech-desert",
                    "4 Days Marrakech Desert & Ait Ben Haddou", "4 días: desierto desde Marrakech y Ait Ben Haddou",
                    "Desert Tours", "Tours por el desierto", "Sahara", "Sáhara",
                    "4 Days / 3 Nights", "4 días / 3 noches", "430",
                    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1400&q=85",
                    "A slower Sahara route with kasbahs, valleys and a desert camp.",
                    "Una ruta tranquila por el Sáhara con kasbahs, valles y campamento en el desierto.",
                    "Marrakech → Ouarzazate → Dades → Merzouga", "Marrakech → Ouarzazate → Dades → Merzouga",
                    "A deeper desert journey with time to enjoy southern Morocco.",
                    "Un viaje más profundo por el desierto, con tiempo para disfrutar del sur de Marruecos.",
                    "Marrakech to Ouarzazate|Ouarzazate to Merzouga|Merzouga desert experience|Return to Marrakech",
                    "De Marrakech a Ouarzazate|De Ouarzazate a Merzouga|Experiencia en el desierto de Merzouga|Regreso a Marrakech");
        };
    }

    private void upsert(TourRepository repository, String slug, String title, String titleEs, String category,
            String categoryEs,
            String destination, String destinationEs, String duration, String durationEs, String price, String imageUrl,
            String shortDescription, String shortDescriptionEs, String route, String routeEs, String description,
            String descriptionEs, String itinerary, String itineraryEs) {
        Tour tour = repository.findBySlug(slug).orElseGet(Tour::new);
        tour.slug = slug;
        tour.title = title;
        tour.titleEs = titleEs;
        tour.category = category;
        tour.categoryEs = categoryEs;
        tour.destination = destination;
        tour.destinationEs = destinationEs;
        tour.duration = duration;
        tour.durationEs = durationEs;
        tour.price = new BigDecimal(price);
        tour.imageUrl = imageUrl;
        tour.shortDescription = shortDescription;
        tour.shortDescriptionEs = shortDescriptionEs;
        tour.route = route;
        tour.routeEs = routeEs;
        tour.description = description;
        tour.descriptionEs = descriptionEs;
        tour.itinerary = itinerary;
        tour.itineraryEs = itineraryEs;
        repository.save(tour);
    }
}
