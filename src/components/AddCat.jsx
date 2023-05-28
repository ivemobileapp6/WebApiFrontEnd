import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddCat.css';

const AddCat = () => {
  const [userType, setUserType] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    
    console.log('storedUserType:', storedUserType);
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('age', age);
    formData.append('breed', breed);
    formData.append('gender', gender);
    formData.append('description', description);
    if (photos) {
      formData.append('photos', photos);
    }

    try {
      console.log(formData)

      const response = await axios.post('https://webapiassignment.ivemobileapp6.repl.co/addcat', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert('Cat added successfully');
      } else {
        alert('An error occurred while adding the cat');
      }
    } catch (error) {
      alert('An error occurred while adding the cat');
    }
  };

  if (userType !== 'staff') {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You must be a staff member to add a cat.</p>
      </div>
    );
  }


  return (
    <div>
      
      <h1>Add Cat</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Age:
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
        <br />
        <label>
          Breed:
          <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} />
        </label>
        <br />
        <label>
          Gender:
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Image:
          <input type="file" onChange={(e) => setPhotos(e.target.files[0])} />
        </label>
        <br />
        <button type="submit">Add Cat</button>
      </form>
    </div>
  );
};

export default AddCat;