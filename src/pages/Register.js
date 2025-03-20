import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        roleId: 2  // Default role for normal users
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('https://localhost:7144/api/auth/register', formData);
            if (response.status === 200) {
                alert('Registration successful! Please log in.');
                navigate('/login'); // Redirect to login after success
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Registration failed.');
            } else {
                setError('Registration failed. Try again.');
            }
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Create an Account</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="register-form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            className="register-input"
                            placeholder="Enter first name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="register-form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            className="register-input"
                            placeholder="Enter last name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="register-form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="register-input"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="register-form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            className="register-input"
                            placeholder="Create password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="register-btn">Sign-up</button>
                </form>
                <p className="register-link">Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;
