import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Favourite.css';


const CatCard = ({ cat }) => (
  <div className="cat-card">
    {cat.photos.length > 0 &&<img src= {`https://webapiassignment.ivemobileapp6.repl.co/${cat.photos[0]}`} alt={cat.breed} width="200" />}

    <p>{cat.breed || 'Unknown Breed'}</p>
    <p>Age: {cat.age} | Gender: {cat.gender || 'Unknown'}</p>
    <p>{cat.description || 'No description provided.'}</p>
  </div>
);

const FavouriteCats = () => {
  const [favoriteCats, setFavoriteCats] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchFavoriteCats = async () => {
      try {
        const response = await axios.get(`https://webapiassignment.ivemobileapp6.repl.co/favourites/${userId}`);
        const catList = response.data;
        setFavoriteCats(catList);
      } catch (error) {
        console.error('Error fetching favorite cats:', error);
      }
    };

    fetchFavoriteCats();
  }, [userId]);

  return (
    <div className="cat-grid">
      {favoriteCats.map((cat) => (
        <CatCard key={cat._id} cat={cat} />
      ))}
    </div>
  );
};

export default FavouriteCats;