import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const params = useParams();
    useEffect( () => {
        getProductDetails();
    },[]);
    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
    }

    const handleProduct = async () => {
        console.warn({name,price,category});
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method: "PUT",
            body: JSON.stringify({ name, price, category }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        console.warn(result);
    }

    return (
        <div className='register'>
            <h1>Update Product</h1>
            <input value={name} className='inputBox' onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter Name' />
            <input value={price} className='inputBox' onChange={(e) => setPrice(e.target.value)} type="text" placeholder='Enter Price' />
            <input value={category} className='inputBox' onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Enter Category" />
            <button className='appButton' onClick={handleProduct} >Update Product</button>
        </div>
    )
};

export default UpdateProduct;