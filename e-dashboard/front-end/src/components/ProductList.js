import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';

const ProductList = () => {
    const [product, setProducts] = React.useState([]);
    useEffect(() => {
        getProducts();
    }, []);
    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products',{
            headers: {
                Authorization : JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setProducts(result);
    }
    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method: "Delete"
        });
        result = await result.json();
        if(result){
            getProducts();
        }
    }

    const handleSearch = async (event) => {
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
        result = await result.json();
        setProducts(result);
        }
        else{
            getProducts();
        }
    }
    return (
        <div className='product-listing'>
            <h3>Product Listing</h3>
            <input className='searchBox' type='text' onChange={handleSearch} placeholder='Search'/>
            <ul>
                <li>Product Name</li>
                <li>Product Price</li>
                <li>Product Category</li>
                <li>Operations</li>
            </ul>
            {product.map((element) =>
                <ul>
                    <li>{element.name}</li>
                    <li>{element.price}</li>
                    <li>{element.category}</li>
                    <button onClick={() => deleteProduct(element._id)}>delete</button>
                    <Link to={"/update/"+element._id}>Update</Link>
                </ul>
            )}
        </div>
    )
}

export default ProductList;