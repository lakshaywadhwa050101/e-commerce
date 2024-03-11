import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import casualShirtMen from '../../Assets/casualmen.avif';
import formalPantMen from '../../Assets/formalPmen.jpg';
import formalShirtMen from '../../Assets/formalSmen.avif'
import jeansMen from '../../Assets/jeansMen.avif'
import shoesMen from '../../Assets/formalShmen.avif'
import dressWomen from '../../Assets/dressWomen.avif'
import shoesWomen from '../../Assets/shoeWomen.webp'
import topWomen from '../../Assets/topWomen.avif'
import jeansWomen from '../../Assets/jeansWomen.avif'
import formalShirtWomen from '../../Assets/formalSwomen.avif'

const Shop = () => {
  const [products, setProducts] = useState([
    { id: 1, category: 'Men', name: 'Casual Shirt', price: '₹799', image: casualShirtMen, countInCart: 0 },
    { id: 2, category: 'Men', name: 'Formal Pants', price: '₹999', image: formalPantMen, countInCart: 0 },
    { id: 3, category: 'Men', name: 'Formal Shirt', price: '₹899', image: formalShirtMen, countInCart: 0 },
    { id: 4, category: 'Men', name: 'Jeans', price: '₹1199', image: jeansMen, countInCart: 0 },
    { id: 5, category: 'Men', name: 'Shoes', price: '₹1999', image: shoesMen, countInCart: 0 },
    { id: 6, category: 'Women', name: 'Dress', price: '₹1999', image: dressWomen, countInCart: 0 },
    { id: 7, category: 'Women', name: 'Shoes', price: '₹1899', image: shoesWomen, countInCart: 0 },
    { id: 8, category: 'Women', name: 'Top', price: '₹899', image: topWomen, countInCart: 0 },
    { id: 9, category: 'Women', name: 'Jeans', price: '₹999', image: jeansWomen, countInCart: 0 },
    { id: 10, category: 'Women', name: 'Formal Shirt', price: '₹759', image: formalShirtWomen, countInCart: 0 },
  ]);
  const [countOfItems, setCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (productId) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return { ...product, countInCart: product.countInCart + 1 };
      }
      return product;
    });
    setProducts(updatedProducts);
    setCount(countOfItems + 1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar type='afterLogin' count={countOfItems} onSearch={handleSearch} />
      <div className="container">
        <h2 className="text-center mt-3">Explore the Products!</h2>
        <div className="row">
          <div className="col">
            <h2>Men</h2>
            <div className="row">
              {filteredProducts.filter(product => product.category === 'Men').map(product => (
                <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 mb-3">
                  <ProductCard product={product} addToCart={addToCart} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h2>Women</h2>
            <div className="row">
              {filteredProducts.filter(product => product.category === 'Women').map(product => (
                <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 mb-3">
                  <ProductCard product={product} addToCart={addToCart} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, addToCart }) => {
  const [selectedSize, setSelectedSize] = useState("");

  const handleSizeChange = (size) => {
    setSelectedSize(size); // Update selected size when dropdown value changes
  };

  return (
    <div className="card">
      <img className="card-img-top" src={product.image} alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.price}</p>
        
        {/* <DropdownButton variant="secondary" size="sm" id="sizeDropdown" title={selectedSize ? selectedSize : "Select Size"}>
          <Dropdown.Item onClick={() => handleSizeChange("Small")}>Small</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSizeChange("Medium")}>Medium</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSizeChange("Large")}>Large</Dropdown.Item>
        </DropdownButton> */}

        <button className="btn btn-sm btn-primary mt-2" onClick={() => addToCart(product.id)}>{product.countInCart > 0 ? product.countInCart+' +' : "Add to Cart"}</button>
      </div>
    </div>
  );
};

export default Shop;
