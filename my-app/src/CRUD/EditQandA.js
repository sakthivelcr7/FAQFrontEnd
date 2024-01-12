import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';


const EditQandA = () => {
    const {id} = useParams();
    const nav = useNavigate();

    const [editedUserData, setEditedUserData] = useState({
        ques:"",
        ans: ""
      
      });

    
    useEffect( () => {
      
      axios.get(`https://localhost:7041/api/users/${id}`)
        .then((res) => {
          console.log('Axios Response:', res);
          setEditedUserData(res.data);
          console.log('State Updated:', editedUserData); // Add this log
        })
        .catch((err) => console.error('Axios Error:', err));
    }, [id]);


      const handleChange = (event) => {
        setEditedUserData({
          ...editedUserData,
          [event.target.name]: event.target.value
        });
      };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform API call to create user using userData
      await axios.put(`https://localhost:7041/api/users/${id}`, editedUserData);
      
      // Redirect to the default page after successful submission
      window.location.href = '/'; // Replace with the actual URL
    } catch (error) {
      console.error('Error editing question:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
       <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
       <h2 className='mb-4'>Edit FAQ</h2>
      <form onSubmit={handleSubmit}>
        {/* Other form fields... */}
        <div className="form-group mb-2">
          <label htmlFor="ques"><strong>Question</strong></label>
          <input
            type="text"
            className="form-control"
            id="ques"
            name="ques"
            value={editedUserData.ques}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group  mb-2">
          <label htmlFor="ans"><strong>Answer</strong></label>
          <input
            type="text"
            className="form-control"
            id="ans"
            name="ans"
            value={editedUserData.ans}
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

export default EditQandA;





// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';

// const EditQandA = () => {
//     const { id } = useParams();
//     const nav = useNavigate();

//     const [product, setProduct] = useState({
//         id: "",
//         ques: "",
//         ans: ""
//     });

//     useEffect(() => {
//         axios.get(`https://localhost:7041/api/users/${id}`)
//             .then((res) => {
//                 console.log(res.data); // Add this line for debugging
//                 setProduct(res.data);
//             })
//             .catch((err) => {
//                 console.error(err);
//             });
//     }, [id]);
    

//     const inputHandler = (event) => {
//         setProduct({ ...product, [event.target.name]: event.target.value });
//     };

//     const updateProduct = (event) => {
//         event.preventDefault();
//         axios.put(`http://localhost:7041/api/users/${id}`, product)
//             .then(() => {
//                 window.alert("Question and answer updated successfully");
//                 nav("/");
//             })
//             .catch((err) => {
//                 console.error(err);
//             });
//     };

//     return (
//         <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
//             <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
//                 <h2 className='mb-4'>Update Question and Answer</h2>
//                 <form onSubmit={updateProduct}>
//                     <div className='mb-2'>
//                         <label htmlFor='ques'><strong>Question:</strong> </label>
//                         <input
//                             type='text'
//                             name='ques'
//                             className='form-control'
//                             placeholder='Enter question'
//                             onChange={inputHandler}
//                             value={product.ques}
//                         />
//                     </div>

//                     <div className='mb-2'>
//                         <label htmlFor='ans'><strong>Answer:</strong> </label>
//                         <input
//                             type='text'
//                             name='ans'
//                             className='form-control'
//                             placeholder='Enter answer'
//                             onChange={inputHandler}
//                             value={product.ans}
//                         />
//                     </div>

//                     <div className='pt-3'>
//                         <button className='btn btn-success' type='submit'>
//                             Update
//                         </button>
//                         <Link to="/" className='btn btn-primary ms-3'>
//                             Back
//                         </Link>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );  
// };

// export default EditQandA;
