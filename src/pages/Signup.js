import React, { useState } from 'react'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name,setName] = useState('');
    const [role, setRole] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await addDoc(collection(db, 'Users'), {
            email:email,
            name:name,
            role:role
            });
        console.log(userCredential);
        const user = userCredential.user;
        localStorage.setItem('token', user.accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        navigate("/");
        } catch (error) {
            alert(error);
        console.error(error);
        }
    }

    return (
        <div>
        <h1>Signup Page</h1>
        <form onSubmit={handleSubmit} className='signup-form'>
            <input
            type="email"
            placeholder="Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="Your Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <input
            type="role"
            placeholder="Your Role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            />
            <input
            type="name"
            placeholder="Your Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className='signup-button'>Signup</button>
        </form>
        <p>Need to Login? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default Signup