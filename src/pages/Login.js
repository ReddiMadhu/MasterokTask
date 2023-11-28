import React, { useState ,useContext} from 'react'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { TodoContext } from '../context';
import {collection,getDocs,onSnapshot,query,where} from "firebase/firestore";
import {db} from '../firebase';
import './Login.css';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUserRole } = useContext(TodoContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));
    
            const querySnapshot = await getDocs(query(collection(db, "Users"), where("email", "==", email)));
    
            if (querySnapshot.size > 0) {
                const userDoc = querySnapshot.docs[0];
                const userRole = userDoc.data().role;
                setUserRole(userRole);
            }
    
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className='login2'>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit} className='login-form'>
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
            <button type="submit" className='login-button'>Login</button>
        </form>
        <p>Need to Signup? <Link to="/signup">Create Account</Link></p>
        </div>
    )
}

export default Login