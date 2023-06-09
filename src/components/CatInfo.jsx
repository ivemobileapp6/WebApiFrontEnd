/**
 * CatInfo component
 *
 * The component displays cats with filtering and search functions.
 * It fetches cat data from backend API
 * Edit, Delete buttons are only visible to staff, Add to Favourites button is only visible to user
 * 
 */

import React, { useState, useEffect } from 'react';
import './CatInfo.css';


const CatCard = ({ cat, onDelete, userType, onAddToFavourites   }) => {
   const { _id, age, breed, gender, photos, description } = cat;

  return (
    <div className="cat-card">
      {photos && photos.length > 0 && <img src={`https://webapiassignment.ivemobileapp6.repl.co/${photos}`} alt="Cat" width="150" />}
      <p>Catid: {_id} </p>
      <p>Breed: {breed}</p>
      <p>Age: {age ? age : 'N/A'}</p>
      <p>Gender: {gender}</p>
      <p>Description: {description} </p>
{userType === 'staff' && <button onClick={() => window.location.href = 'https://webapifrontend.ivemobileapp6.repl.co/editcat'}>Edit</button>}
      {userType === 'staff' && <button onClick={() => onDelete(_id)}>Delete</button>} 
      {userType === 'public' && <button onClick={() => onAddToFavourites(_id)}>Add to Favourites</button> }
    </div>
  );
};

const CatInfo = () => {
  const [cats, setCats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({ gender: '', age: '' });

  const getUserType = () => {
    return localStorage.getItem('userType');
  };
  
  const userType = getUserType();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

   const filteredCats = () => {
    return cats.filter((cat) => {
      const searchTermLower = searchTerm.toLowerCase();
      const searchMatch = cat.breed.toLowerCase().includes(searchTermLower) || cat.description.toLowerCase().includes(searchTermLower);
      const genderMatch = !filter.gender || cat.gender === filter.gender.toLowerCase();
      const ageMatch = !filter.age || ageFilterMatches(cat.age);

      return searchMatch && genderMatch && ageMatch;
    });
  };
   const ageFilterMatches = (catAge) => {
    switch (filter.age) {
      case '0-3':
        return catAge >= 0 && catAge <= 3;
      case '4-7':
        return catAge >= 4 && catAge <= 7;
      case '7+':
        return catAge > 7;
      default:
        return true;
    }
  };
  const deleteCat = async (Id) => {
    try {
      await fetch(`https://webapiassignment.ivemobileapp6.repl.co/cat/${Id}`, {
        method: 'DELETE',
      });

      setCats((prevCats) => prevCats.filter((cat) => cat._id !== Id));
    } catch (error) {
      console.error('Error deleting cat:', error);
    }
  };


const handleAddToFavourites = async (catId) => {
  const userId = localStorage.getItem('userId');

  try {

    // Replace with your API endpoint for adding a cat to the user's favorites
    const response = await fetch(`https://webapiassignment.ivemobileapp6.repl.co/favourites`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ catId, userId }),
    });

    if (response.ok) {
      alert('Cat added to favorites!');
    } else {
      alert('Failed to add cat to favorites.');
    }
  } catch (error) {
    console.error('Error adding cat to favorites:', error);
  }
};

  useEffect(() => {
    const fetchCats = async () => {
      const response = await fetch('https://webapiassignment.ivemobileapp6.repl.co/cat');
      const data = await response.json();
      setCats(data);
    };

    fetchCats();
  }, []);

  return (
    <div className="add-cat">
      <h1>Cats Gallery</h1>
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search by breed or description..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select name="gender" value={filter.gender} onChange={handleFilterChange}>
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
     <select name="age" value={filter.age} onChange={handleFilterChange}>
        <option value="">All Ages</option>
        <option value="0-3">0-3</option>
        <option value="4-7">4-7</option>
        <option value="7+">7+</option>
      </select>
      </div>
      <div className="cat-grid">
        {filteredCats().map((cat) => (

          <CatCard key={cat._id} cat={cat} onDelete={deleteCat} userType={userType}     onAddToFavourites={handleAddToFavourites}
/>

        ))}
      </div>
    </div>
  );
};

export default CatInfo;