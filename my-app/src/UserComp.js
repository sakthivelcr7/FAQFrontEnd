// UserComponent.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserComponent = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get('http://your-backend-api-url/faqs');
        setFaqs(response.data);
      } catch (error) {
        console.error('Error fetching FAQs', error);
      }
    };

    fetchFAQs();
  }, []);

  return (
    <div>
      <h2>FAQs</h2>
      <ul>
        {faqs.map((faq, index) => (
          <li key={index}>
            <strong>{faq.question}</strong>
            <p>{faq.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserComponent;
