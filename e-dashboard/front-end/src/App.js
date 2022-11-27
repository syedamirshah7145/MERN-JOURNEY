import './App.css';
import Nav from './components/Nav.js';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Signup from './components/Signup';
import PrivateComponent from './components/PrivateComponents';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Nav />
      <Routes>

        <Route element={<PrivateComponent />} >
        <Route path='/' element={<ProductList />} />
        <Route path='/add' element={<AddProduct />}/>
        <Route path='/profile' element={<h1>profile</h1>}/>
        <Route path='/logout' element={<h1>Logout</h1>}/>
        <Route path='/update' element={<h1>Update Product</h1>}/>
        </Route>

        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />} />
        
      </Routes>
      <Footer />
  </BrowserRouter> 
    </div>
  );
}

export default App;
