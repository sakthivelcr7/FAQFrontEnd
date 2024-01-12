import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FAQItem = ({ id, question, answer, isOpen, toggleFAQ }) => (
  <div className="accordion-item">
    <h2 className="accordion-header" id={`faqHeading${id}`}>
      <button className={`accordion-button ${isOpen ? '' : 'collapsed'}`} type="button" onClick={() => toggleFAQ(id)}>
        {question}
      </button>
    </h2>
    <div className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`} id={`faqCollapse${id}`} aria-labelledby={`faqHeading${id}`} data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <strong>{answer}</strong>
      </div>
    </div>
  </div>
);

function StudFAQ() {
  const [users, setUsers] = useState([]);
  const [openFAQs, setOpenFAQs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [studQuesData, setStudQuesData] = useState({
    Name: '',
    Email: '',
    StudQues: ''
  });

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://localhost:7041/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Filter users based on search query
    const filteredResults = users.filter(user =>
      user.ques.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [searchQuery, users]);

  const toggleFAQ = (id) => {
    setOpenFAQs(prevOpenFAQs => {
      const index = prevOpenFAQs.indexOf(id);
      if (index !== -1) {
        return [...prevOpenFAQs.slice(0, index), ...prevOpenFAQs.slice(index + 1)];
      } else {
        return [...prevOpenFAQs, id];
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudQuesData({
      ...studQuesData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(studQuesData);
      // Perform API call to create student's question using studQuesData
      await axios.post('https://localhost:7041/api/users/StudQues', studQuesData);

      // Redirect to the default page after successful submission
      window.location.href = '/'; // Replace with the actual URL
    } catch (error) {
      console.error('Error creating student question:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div>
      <div className="background-image" style={{ backgroundImage: `url('https://www.shutterstock.com/image-illustration/question-mark-front-color-wall-260nw-1706677192.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '30vh', position: 'relative' }}>
        <div className='text-white ms-5'><h6>WelCome to Help Center</h6></div>
        <div className='text-white' style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%', color: 'white' }}>
          <h2>What can we <br />help you Find</h2>
        </div>
        <div className="search-box" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <input type="text" placeholder="Search..." onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>

      <div className="container mt-5">
      
      
             <h2 className="text-center mb-4 text-info">Frequently Asked Questions</h2>
        <div className="accordion" id="accordionExample">
          {searchQuery ? (
            searchResults.map(user => (
              <FAQItem key={user.id} id={user.id} question={user.ques} answer={user.ans} isOpen={openFAQs.includes(user.id)} toggleFAQ={toggleFAQ} />
            ))
          ) : (
            users.map(user => (
              <FAQItem key={user.id} id={user.id} question={user.ques} answer={user.ans} isOpen={openFAQs.includes(user.id)} toggleFAQ={toggleFAQ} />
            ))
          )}
        </div>
      </div>

      <div className="container mt-5 mr-5">
        <div><h6>Can't Find your Question Ask here...</h6></div>
        <form onSubmit={handleSubmit} className="shadow p-4 rounded w-50">
          <div className="mb-3">
            <label htmlFor="Name" className="form-label fw-bold">Name:</label>
            <input
              type="text"
              className="form-control "
              id="Name"
              name="Name"
              value={studQuesData.Name}
              placeholder="Enter your name here"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Email" className="form-label fw-bold">Email:</label>
            <input
              type="text"
              className="form-control "
              id="Email"
              name="Email"
              placeholder="Enter your email here"
              value={studQuesData.Email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="StudQues" className="form-label fw-bold">Student Question:</label>
            <textarea
              className="form-control"
              id="StudQues"
              name="StudQues"
              placeholder="Enter your query here"
              value={studQuesData.StudQues}
              onChange={handleChange}
              required
              rows="5"
            />
          </div>

          <div className="mb-3 align-item-center">
            <button type="submit" className="btn btn-primary ">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudFAQ;
