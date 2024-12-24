import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;

        if (password !== cpassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            const json = await response.json();
            console.log(json);

            if (json.success) {
                // Save the auth token and redirect
                localStorage.setItem('token', json.authtoken);
                navigate('/');
            } else {
                alert(json.error || "Invalid credentials");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' id="name" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="email" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="password" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name='cpassword' id="cpassword" onChange={onChange} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Signup;
