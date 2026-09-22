export function localizeTour(tour, language) {
  if (!tour || language !== "es") return tour;

  return {
    ...tour,
    title: tour.titleEs || tour.title,
    category: tour.categoryEs || tour.category,
    destination: tour.destinationEs || tour.destination,
    duration: tour.durationEs || tour.duration,
    shortDescription: tour.shortDescriptionEs || tour.shortDescription,
    description: tour.descriptionEs || tour.description,
    route: tour.routeEs || tour.route,
    itinerary: tour.itineraryEs || tour.itinerary,
  };
}
