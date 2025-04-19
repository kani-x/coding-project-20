import { useState, useEffect } from 'react';
import Gallery from './components/Gallery';
import DestinationSelector from './components/DestinationSelector';
import './App.css';

function App() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState('all');

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

  useEffect(() => {
    fetchTours();
  }, []);

  const handleRemoveTour = (id) => {
    setTours(tours.filter(tour => tour.id !== id));
  };

  const handleRefresh = () => {
    fetchTours();
    setSelectedDestination('all');
  };

  const filteredTours = selectedDestination === 'all' 
    ? tours 
    : tours.filter(tour => tour.name === selectedDestination);

  return (
    <div className="app">
      <h1>Tour Explorer</h1>
      <DestinationSelector 
        tours={tours} 
        selectedDestination={selectedDestination}
        onSelect={setSelectedDestination}
      />
      {loading ? (
        <h2>Loading tours...</h2>
      ) : error ? (
        <h2>Error: {error}</h2>
      ) : filteredTours.length === 0 ? (
        <div>
          <h2>No tours left. Refresh to reload.</h2>
          <button onClick={handleRefresh}>Refresh</button>
        </div>
      ) : (
        <Gallery 
          tours={filteredTours} 
          onRemove={handleRemoveTour} 
        />
      )}
    </div>
  );
}

export default App;
