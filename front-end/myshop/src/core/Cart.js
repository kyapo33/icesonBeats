import React, {useState, useEffect} from 'react'
import Menu from './Menu'
import ShowProductCart from "./ShowProductCart";
import {getCart} from "./cartHelpers"
import {Link} from 'react-router-dom'
import Checkout from './Checkout'


const Cart = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        setItems(getCart());
    }, [items]);

    const showItems = items => {
        return (
            <div>
                <hr/>
                {items.map((product, i) => (<ShowProductCart key={i} product = {product} 
                showAddToCartButton = {false}
                removeProduct = {true}/>))} 
            </div>
            
        )
    }

    const noItems = () => (
        <h2 style={{color:"white"}} >Votre Panier est vide... <br/> <Link style={{color: "#2ac4b7"}} to="/">Voir nos produits</Link></h2>
    );

    return (
        <div>
            <Menu/>
            <section id="page-title">
                <div className="global-title wow zoomIn">
                    <h1>Panier</h1>
                </div>
            </section>
            <section id="cart-order">
                <div className="section">
                    
                    <div className="product-cart">
                   
                    <div className="">
                    {items.length > 0 ? showItems(items) : noItems()}  
                        <Checkout products={items}/>
                    </div>
                    </div>
                </div>
            </section>  
        </div>      
    )
}

export default Cart;