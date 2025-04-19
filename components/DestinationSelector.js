const DestinationSelector = ({ tours, selectedDestination, onSelect }) => {
    // Get unique tour names
    const uniqueDestinations = [...new Set(tours.map(tour => tour.name))];
  
    return (
      <div className="selector">
        <label htmlFor="destination-select">Choose a destination: </label>
        <select
          id="destination-select"
          value={selectedDestination}
          onChange={(e) => onSelect(e.target.value)}
        >
          <option value="all">All Destinations</option>
          {uniqueDestinations.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default DestinationSelector;