import React, { useEffect } from 'react'
import { json, Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/");
        }
    }, [])
    const handleLogin = async () => {
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        if (result.auth) {
            console.warn(result.user);
            console.warn(result.auth);
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate("/")
        }
        else {
            alert("Please enter correct details");
        }
    }

    return (
        <div className='login'>
            <input onChange={(e) => setEmail(e.target.value)} className='inputBox' type="email" placeholder="Enter Email" />
            <input onChange={(e) => setPassword(e.target.value)} className='inputBox' type="password" placeholder="Enter Password" />
            <button onClick={handleLogin} className='appButton' type='button'>Login</button>
        </div>
    )
}

export default Login;