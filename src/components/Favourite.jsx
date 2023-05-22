import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CatCard = ({ cat, onDelete, userType, onAddToFavourites }) => {
  const { _id, age, breed, gender, photos, description } = cat;

  return (
    <div className="cat-card">
      {photos && photos.length > 0 && (
        <img
          src={`https://webapiassignment.ivemobileapp6.repl.co/${photos[0]}`}
          alt="Cat"
          width="150"
        />
      )}
      <p>Breed: {breed}</p>
      <p>Age: {age ? age : 'N/A'}</p>
      <p>Gender: {gender}</p>
      {userType === 'staff' && <button onClick={() => onEdit(_id)}>Edit</button>}
      {userType === 'staff' && <button onClick={() => onDelete(_id)}>Delete</button>}
      {userType === 'public' && (
        <button onClick={() => onAddToFavourites(_id)}>Add to Favourites</button>
      )}
    </div>
  );
};

const FavouriteCats = ({ userId, userType, onDelete, onAddToFavourites }) => {
  const [favoriteCats, setFavoriteCats] = useState([]);

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
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {favoriteCats.map((cat) => (
        <CatCard
          key={cat._id}
          cat={cat}
          userType={userType}
          onDelete={onDelete}
          onAddToFavourites={onAddToFavourites}
        />
      ))}
    </div>
  );
};

export default FavouriteCats;