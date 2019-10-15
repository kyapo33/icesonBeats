import React, {useState} from "react";
import {Redirect} from "react-router-dom"
import Iframe from 'react-iframe'
import {addItem, removeItem} from './cartHelpers'

const ShowProduct = ({ 
    product,
    showAddToCartButton = true,
    removeProduct = false }) => {

    const [redirect, setRedirect] = useState(false)

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true)
        })    
    }
    const shouldRedirect = redirect => {
        if(redirect) {
            return <Redirect to="/cart" />
        }
    }

    const showAddToCart = (showAddToCartButton) => {
        return showAddToCartButton && (
            <div className="ad-to-card-button">
            <button 
                onClick={addToCart}>
                Ajoutez au panier
            </button>
            </div>
        );
    };

    const showRemoveButton = removeProduct => {
        return removeProduct && (
            <div className="remove-button">
                <svg onClick={() => removeItem(product._id)}  xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 15.642 15.642" enable-background="new 0 0 15.642 15.642" width="21" height="21">
                    <path fill-rule="evenodd" d="M8.882,7.821l6.541-6.541c0.293-0.293,0.293-0.768,0-1.061  c-0.293-0.293-0.768-0.293-1.061,0L7.821,6.76L1.28,0.22c-0.293-0.293-0.768-0.293-1.061,0c-0.293,0.293-0.293,0.768,0,1.061  l6.541,6.541L0.22,14.362c-0.293,0.293-0.293,0.768,0,1.061c0.147,0.146,0.338,0.22,0.53,0.22s0.384-0.073,0.53-0.22l6.541-6.541  l6.541,6.541c0.147,0.146,0.338,0.22,0.53,0.22c0.192,0,0.384-0.073,0.53-0.22c0.293-0.293,0.293-0.768,0-1.061L8.882,7.821z" fill="#FFFFFF" />
                </svg>
            </div>
        );
    };

    return (
        <section id="cart-order">
            <div className="section">
                <div className="product-cart">
                    <div className="row cart-item">
                        <div className="col-sm-3">
                            <div>
                               <Iframe url= {product.iframe} width="200px" height="100px"/>
                            </div>
                        </div>
                        <div className="col-sm-3 mt-4">
                            <div className="cart-description">
                                <h5 style={{color:"white"}} >{product.name}</h5>
                            </div>
                        </div>
                        <div className="col-sm-2 price-name-line mb-2">
                            <div className="product-total">
                                <div className="product-price">
                                    <span className="prise-mobile">PRIX</span><span>{product.price}€</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-1 delet-line mb-1">
                            <div className="delete-product">
                            {shouldRedirect(redirect)}
                            {showAddToCart(showAddToCartButton)}
                            {showRemoveButton(removeProduct)}    
                            </div>
                        </div>          
                    </div>
                    
                </div>
            </div>
        </section>    
    );
};

export default ShowProduct;
