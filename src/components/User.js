import React from "react";
import logos from '../images/logos.jpg'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const User=()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const handleLogout = async (e) => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            await signOut(auth);
            navigate("/login");
            } catch (error) {
            console.error(error);
            }
    }
    return(
        <div className="User">
            <div className="logo">
                <img src={logos} alt="logo"/>
            </div>
            <div className="info" >
                <p>Mastork</p>
                <a href="#" onClick={handleLogout}>Logout</a>
            </div>
        </div>
    )
}

export default User;