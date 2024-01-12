import React, { useState } from 'react';
import axios from 'axios';

const CreateStudQues = () => {
    const [studQuesData, setStudQuesData] = useState({
        Name: '',
        Email: '',
        StudQues: ''
    });

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
        <div className="container mt-5 mr-5">
            <div><h2>Ask Your Question</h2></div>
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
                        rows="5" // Increased rows for a bigger input box
                    />
                </div>

                <div className="mb-3 align-item-center">
                    <button type="submit" className="btn btn-primary ">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateStudQues;
