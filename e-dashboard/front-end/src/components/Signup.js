import React,{useState,useEffect} from 'react';
import { json, Navigate, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth){
            navigate("/");
        }
    })

    const collectData = async ()=> {
        let result = await fetch('http://localhost:5000/register',{
            method: 'post',
            body: JSON.stringify({name,email,password}),
            headers: {
                'Content-Type':'application/json'
            },
        });
        result = await result.json();
        localStorage.setItem('user',JSON.stringify(result));
    }

    return (
        <div className='register'>
            <h1>Register</h1>
            <input value={name} onChange={(e) => setName(e.target.value)} className='inputBox' type="text" placeholder="Enter Name" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} className='inputBox' type="email" placeholder="Enter Email" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} className='inputBox' type="password" placeholder='Enter Password'/>
            <button onClick={collectData} className='appButton' type='button'>Sign Up</button>
        </div>
    )
}

export default Signup;