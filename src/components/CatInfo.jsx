// import React, { useState, useEffect } from 'react';
// import './CatInfo.css';


// const AddCat = () => {
//   const [cats, setCats] = useState([]);

  // useEffect(() => {
  //   const fetchCats = async () => {
  //     const response = await fetch('https://webapiassignment.ivemobileapp6.repl.co/getcat');
  //     const data = await response.json();
  //     setCats(data);
  //   };

  //   fetchCats();
  // }, []);

//   return (
//     <div className="add-cat">
//       <h1>Cats Gallery</h1>
//       <div className="cat-grid">
//         {cats.map((cat) => (
//           <CatCard key={cat._id} cat={cat} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AddCat;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CatInfo.css';

  
const CatCard = ({ cat }) => {
  const { age, breed, gender, photos, description } = cat;

  return (
    <div className="cat-card">
      {/*{photos && photos.length > 0 && <img src={photos[0]} alt={description} />}*/}
      {photos && photos.length > 0 && <img src={`https://webapiassignment.ivemobileapp6.repl.co/${photos}`} alt="Cat" width="150" />}
      <p>Breed: {breed}</p>
      <p>Age: {age ? age : 'N/A'}</p>
      <p>Gender: {gender}</p>
    </div>
  );
};

const CatInfo = () => {
  const [cats, setCats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({ gender: '', age: '' });

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
      const ageMatch = !filter.age || cat.age === filter.age;

      return searchMatch && genderMatch && ageMatch;
    });
  };


  useEffect(() => {
    const fetchCats = async () => {
      const response = await fetch('https://webapiassignment.ivemobileapp6.repl.co/getcat');
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
          <option value="1">Kitten</option>
          <option value="Adult">Adult</option>
          <option value="Senior">Senior</option>
        </select>
      </div>
      <div className="cat-grid">
        {filteredCats().map((cat) => (
          <CatCard key={cat._id} cat={cat} />
        ))}
      </div>
    </div>
  );
};

export default CatInfo;