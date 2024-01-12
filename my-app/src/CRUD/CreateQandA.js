import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const CreateQandA = () => {
  const [userData, setUserData] = useState({
    ques: '',
    ans: ''
  });

  const [latestId, setLatestId] = useState(0);

  useEffect(() => {
    // Fetch the latest ID from the server
    axios.get('https://localhost:7041/api/users/latestId')
      .then(response => {
        setLatestId(response.data);
      })
      .catch(error => {
        console.error('Error fetching latest ID:', error);
      });
  }, []); // The empty dependency array ensures this effect runs only once

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use the latest ID to create the new question
      await axios.post('https://localhost:7041/api/users', {
        ...userData,
        id: latestId + 1 // Increment the latest ID
      });

      // Redirect to the default page after successful submission
      window.location.href = '/'; // Replace with the actual URL
    } catch (error) {
      console.error('Error creating question:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div className='body d-flex w-100 vh-100 justify-content-center align-items-center bg-light 'style={{ backgroundImage: `url('https://img.freepik.com/free-photo/questioning-concept-with-question-mark_23-2150408209.jpg?w=1380&t=st=1705053931~exp=1705054531~hmac=8c5db19e516af1b1dc6b348f65591ea61daffa374e2cfce4b8acf1ee3a6952c7')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '30vh', position: 'relative' }}>
       <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h4 className='mb-4'>Add FAQ</h4>
     
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ques"><strong>Question</strong></label>
          <input
            type="text"
            className="form-control"
            id="ques"
            name="ques"
            value={userData.ques}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ans"><strong>Answer</strong></label>
          <input
            type="text"
            className="form-control"
            id="ans"
            name="ans"
            value={userData.ans}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-success mt-3">
            Submit
          </button>
          <Link to="/" className='btn btn-primary mt-3 ms-4' >Back</Link>
        </div>
      </form>
      </div>
    </div>
  );
};

export default CreateQandA;
