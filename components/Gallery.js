import TourCard from './TourCard';
import PropTypes from 'prop-types';

const Gallery = ({ tours, onRemove }) => {
  return (
    <div className="gallery">
      {tours.map((tour) => (
        <TourCard 
          key={tour.id}
          tour={tour}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

// Prop type validation
Gallery.propTypes = {
  tours: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      info: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Gallery;