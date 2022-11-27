import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }
    return (
        <div className='nav-ul'>
        <img className='logo' alt='logo' src='https://w7.pngwing.com/pngs/17/58/png-transparent-web-development-responsive-web-design-e-commerce-business-ecommerce-blue-angle-web-design.png' />
            {auth ?
                < ul >
                    <li><Link to="/">Home </Link></li>
                    <li><Link to="/add">Add Product</Link></li>
                    <li><Link to="/update">Update Products</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name.toUpperCase()})</Link></li>
                </ul >
                :
                <ul className='nav-right'>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">SignUp</Link></li>
                </ul>}
        </div >
    )
};

export default Nav;