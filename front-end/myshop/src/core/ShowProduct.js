import React, {useState} from "react";
import {Redirect} from "react-router-dom"
import Iframe from 'react-iframe'
import {addItem, removeItem} from './cartHelpers'

const ShowProduct = ({ product, showAddToCartButton = true, removeProduct = false }) => {
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
                <button style={{cursor: "pointer"}}
                    onClick={addToCart}>
                    Ajoutez au panier
                </button>
            </div>
        );
    };

    const showRemoveButton = removeProduct => {
        return removeProduct && (
            <div className="remove-button">
                <button
                    onClick={() => removeItem(product._id)}
                    >
                    Supprimer
                </button>
            </div>
        );
    };
    
    return (
        <div className="s-item wow fadeInUp">
             <div className="s-item-image">
                <Iframe url= {product.iframe} width="200px"
                height="150px"/>
            </div>
            <div className="s-item-name">
                <h2>{product.name}</h2>
                <p>{product.price}€</p>
                {shouldRedirect(redirect)}
                {showAddToCart(showAddToCartButton)}
                {showRemoveButton(removeProduct)}  
            </div>
        </div>
    );
};

export default ShowProduct;
