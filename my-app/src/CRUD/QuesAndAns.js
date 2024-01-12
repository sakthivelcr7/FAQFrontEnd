import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { IoMdTrash } from 'react-icons/io';
import { FaRegEdit } from 'react-icons/fa';
import './QuesAndAns.css';

function QuesAndAns() {
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    axios.get('https://localhost:7041/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = async (userId) => {
    // Show a confirmation dialog
    const shouldDelete = window.confirm("Are you sure you want to delete this FAQ?");

    // If the user clicks "OK" in the confirmation dialog, proceed with deletion
    if (shouldDelete) {
      try {
        await axios.delete(`https://localhost:7041/api/users/${userId}`);
        // Reload the users after deletion
        axios.get('https://localhost:7041/api/users')
          .then(response => setUsers(response.data))
          .catch(error => console.error('Error fetching data:', error));
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };

  return (
    <div className='container-fluid'>
      <div className='container'>
        <h3 className='mb-4 mt-3'>Admin FAQ Part</h3>
        <div className='d-flex mb-5'>
          <Link to="/studaskedques" className="btn btn-dark mr-2">
            Queries
          </Link>
          <Link to="/create-user" className="btn btn-success ml-auto ms-3">
            Add FAQ
          </Link>
        </div>

        <div className="table-container">
          <table className="table shadow border-rounded table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Questions</th>
                <th scope="col">Answer</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.ques}</td>
                  <td>{user.ans}</td>
                  <td>
                    <Link to={`/edit-user/${user.id}`} className="btn btn-primary">
                      <FaRegEdit />
                    </Link>
                    <button className="btn btn-danger ms-2" onClick={() => handleDelete(user.id)}>
                      <IoMdTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default QuesAndAns;
