import React from 'react';

const AddProduct = () => {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [error,setError] = React.useState(false);
    const handleProduct = async () => {
        //fetching api for adding product

        if(!name || !price || !category){
            setError(true);
            return false;
        }
        const userId = JSON.parse(localStorage.getItem("user"))._id;

        let result = await fetch('http://localhost:5000/add-product', {
            method: "post",
            body: JSON.stringify({ name, price, category, userId }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        console.warn(result);
    }

    return (
        <div className='register'>
            <h1>Add Product</h1>
            <input value={name} className='inputBox' onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter Name' />
            { error && !name && <span className='input-error'>Enter Correct Name!</span>}
            <input value={price} className='inputBox' onChange={(e) => setPrice(e.target.value)} type="text" placeholder='Enter Price' />
            { error && !price && <span className='input-error'>Enter Correct Price!</span>}
            <input value={category} className='inputBox' onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Enter Category" />
            { error && !category && <span className='input-error'>Enter Correct Category!</span>}
            <button className='appButton' onClick={handleProduct} >Submit</button>
        </div>
    )
};

export default AddProduct;