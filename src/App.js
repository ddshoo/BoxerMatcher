import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [reach, setReach] = useState('');
  const [weight, setWeight] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setRecommendations([]);
    setLoading(true);

    // Basic input validation
    if (
      heightFeet === '' ||
      heightInches === '' ||
      reach === '' ||
      weight === ''
    ) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    // Optionally, you can add more validation here (e.g., numeric ranges)

    try {
      const response = await axios.post('http://127.0.0.1:8000/recommend', {
        height: `${heightFeet}'${heightInches}"`,
        reach: `${reach}"`,
        weight: parseFloat(weight),
      });

      setRecommendations(response.data.recommendations);
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching recommendations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>BoxerMatcher</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Height:</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="number"
              value={heightFeet}
              onChange={(e) => setHeightFeet(e.target.value)}
              placeholder="Feet"
              min="0"
              style={{ width: '60px', marginRight: '5px' }}
            />
            <span>'</span>
            <input
              type="number"
              value={heightInches}
              onChange={(e) => setHeightInches(e.target.value)}
              placeholder="Inches"
              min="0"
              max="11"
              style={{ width: '60px', marginLeft: '5px', marginRight: '5px' }}
            />
            <span>"</span>
          </div>
        </div>
        <div>
          <label>Reach:</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="number"
              value={reach}
              onChange={(e) => setReach(e.target.value)}
              placeholder="72"
              min="0"
              style={{ width: '100px', marginRight: '5px' }}
            />
            <span>"</span>
          </div>
        </div>
        <div>
          <label>Weight (lbs): </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="160"
            min="0"
          />
        </div>
        <button type="submit">Find Matches</button>
      </form>

      {loading && <p>Loading recommendations...</p>}

      {error && <p className="error">{error}</p>}

      {recommendations.length > 0 && (
        <div className="results">
          <h2>Top Matches:</h2>
          <ul>
            {recommendations.map((boxer, index) => (
              <li key={index}>
                <strong>{boxer.name}</strong>
                <br />
                Height: {boxer.height}
                <br />
                Reach: {boxer.reach}
                <br />
                Weight Range: {boxer.weight_range}
                <br />
                Mahalanobis Distance: {boxer.mahalanobis_distance.toFixed(4)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
