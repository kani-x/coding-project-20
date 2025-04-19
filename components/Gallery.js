import TourCard from './TourCard';

const Gallery = ({ tours, onRemove }) => {
  return (
    <div className="gallery">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default Gallery;