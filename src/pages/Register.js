import React, { useState } from 'react';
    
    function RegistrationForm() {
        const [formData, setFormData] = useState({
            username: '',
            email: '',
            password: ''
        });
    
        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };
    
        const handleSubmit = (e) => {
            e.preventDefault();
            // Handle form submission logic here (e.g., API call)
            console.log(formData);
            if (!formData.username || !formData.email || !formData.password) {
                alert("Please fill in all fields.");
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert("Please enter a valid email address.");
        return;
    }
    if (formData.password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }
        };
    
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Register</button>
            </form>
        );
    }
    
    export default RegistrationForm;