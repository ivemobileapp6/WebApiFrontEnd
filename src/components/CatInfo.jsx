import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

const CatInfo = () => {
  const [catData, setCatData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const response = await axios.get('https://webapiassignment.ivemobileapp6.repl.co/getcat/645fbc70cb9b6e78ca0215e9'); // Replace with your API endpoint
        setCatData(response.data.data); // Assuming the cat data is in the 'data' property of the response
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCatData();
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>Cat Information</h1>
      <div>
        <h2>{catData.breed}</h2>
        <p>Age: {catData.age}</p>
        <p>Gender: {catData.gender}</p>
        <p>Description: {catData.description}</p>
        {catData.photos.length > 0 && (
          <div>
            <h3>Photo:</h3>
      <img src={`https://webapiassignment.ivemobileapp6.repl.co/${catData.photos[0]}`} alt="Photo of cat" width="300" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CatInfo;