import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { IoMdTrash } from 'react-icons/io';
import { FaQuestion } from 'react-icons/fa';
import axios from 'axios';

function StudAskedQues() {
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    axios.get('https://localhost:7041/api/users/StudQuesGet')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = async (userId) => {
    console.log("Deleting user with ID:", userId);

    // Show a confirmation dialog
    const shouldDelete = window.confirm("Are you sure you want to delete this FAQ?");

    // If the user clicks "OK" in the confirmation dialog, proceed with deletion
    if (shouldDelete) {
      try {
        await axios.delete(`https://localhost:7041/api/users/StudQuesGet/${userId}`);
        // Update the state by filtering out the deleted user
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };

  return (
    <div className='container mt-5' style={{ width: '80%', height: '80vh' }}>
      <div className='d-flex align-items-center justify-content-between'>
        <div>
          <h2>Individual Asked Questions</h2>
        </div>
        <div>
          {/* Icon in the top right corner */}
          <FaQuestion style={{fontSize:'90px' ,color:'#283954'}} /><FaQuestion style={{fontSize:'90px',color:'#941c0f'}} />
        </div>
      </div>
      <div className='d-flex align-items-center justify-content-right'>
        <Link to="/" className="btn btn-success mr-2">Back</Link>
      </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Question</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
              <td>{user.studQues}</td>
              <td>
                <button className="btn btn-danger ms-2" onClick={() => handleDelete(user.id)}>
                  <IoMdTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudAskedQues;
