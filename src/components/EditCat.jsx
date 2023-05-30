/**
 * EditCat component
 *
 * The component provides staff users to update the information of a specific cat. 
 * The user type is retrieved from localStorage to determine if the useris staff to edit cat 
 * information. 
 * If the user is not a staff member,
 * an "Access Denied" message is displayed.
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditCat = () => {
  const [userType, setUserType] = useState('');
  const [catId, setCatId] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

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
    uploadedPhotos.forEach((photo) => {
      formData.append('photos', photo);
    });

    console.log('age:', age);
    console.log('breed:', breed);
    console.log('gender:', gender);
    console.log('description:', description);
    console.log('uploadedPhotos:', uploadedPhotos);

    try {
      console.log(formData)
      const response = await axios.put(`https://webapiassignment.ivemobileapp6.repl.co/cat/${catId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Server response:', response);

      if (response.data.success) {
        alert('Cat updated successfully');
      } else {
        alert('An error occurred while updating the cat');
      }
    } catch (error) {
      alert('An error occurred while updating the cat');
    }
  };

  const handlePhotoUpload = (e) => {
    setUploadedPhotos([...uploadedPhotos, ...Array.from(e.target.files)]);
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
      <h1>Edit Cat</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Cat ID:
          <input type="text" value={catId} onChange={(e) => setCatId(e.target.value)} />
        </label>
        <br />
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
          Photos:
          <input type="file" multiple onChange={handlePhotoUpload} />
        </label>
        <br />
        <button type="submit">Update Cat</button>
      </form>
    </div>
  );
};

export default EditCat;