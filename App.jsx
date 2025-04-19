import { useState, useEffect } from 'react';
import Gallery from './components/Gallery';
import DestinationSelector from './components/DestinationSelector';
import './App.css';

function App() {
  // State management
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [removedTours, setRemovedTours] = useState([]); // Track removed tours (Task 4)

  // Fetch tours from API
  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://course-api.com/react-tours-project');
      if (!response.ok) throw new Error('Failed to fetch tours');
      const data = await response.json();
      setTours(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchTours();
  }, []);

  // Remove tour and track removal (Task 3 + Task 4)
  const handleRemoveTour = (id) => {
    setTours(tours.filter(tour => tour.id !== id));
    setRemovedTours([...removedTours, id]);
  };

  // Refresh tours while respecting removed items (Task 4)
  const handleRefresh = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://course-api.com/react-tours-project');
      const data = await response.json();
      
      // Filter out previously removed tours
      const filteredData = data.filter(tour => !removedTours.includes(tour.id));
      
      setTours(filteredData);
      setSelectedDestination('all'); // Reset filter
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter tours based on selection
  const filteredTours = selectedDestination === 'all' 
    ? tours 
    : tours.filter(tour => tour.name === selectedDestination);

  return (
    <div className="app">
      <h1>Tour Explorer</h1>
      
      {/* Destination dropdown (Task 2) */}
      <DestinationSelector 
        tours={tours} 
        selectedDestination={selectedDestination}
        onSelect={setSelectedDestination}
      />
      
      {/* Conditional rendering (Tasks 1, 3, 4) */}
      {loading ? (
        <h2>Loading tours...</h2>
      ) : error ? (
        <h2>Error: {error}</h2>
      ) : filteredTours.length === 0 ? (
        <div className="empty-state">
          <h2>{tours.length === 0 ? 'No tours left.' : 'No matching tours.'}</h2>
          {tours.length === 0 && (
            <button className="refresh-btn" onClick={handleRefresh}>
              Refresh Tours
            </button>
          )}
        </div>
      ) : (
        <Gallery tours={filteredTours} onRemove={handleRemoveTour} />
      )}
    </div>
  );
}

export default App;