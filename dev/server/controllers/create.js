import React, { useState } from 'react';
import axios from 'axios';

function CreateItem() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/audio', {
        name,
        description,
      });
      console.log(response.data);
      // Do something with the response, such as updating the UI.
    } catch (error) {
      console.error(error);
      // Handle the error, such as showing an error message to the user.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      <button type="submit">Create</button>
    </form>
  );
}