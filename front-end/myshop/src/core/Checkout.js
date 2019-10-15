import React, {useState, useEffect} from 'react'
import {getBraintreeToken, processPayment, createOrder} from '../core'
import {isAuthenticated} from '../auth'
import {Link} from "react-router-dom"
import "braintree-web";
import DropIn from "braintree-web-drop-in-react";
import {emptyCart} from './cartHelpers'


const Checkout = ({products}) => {
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        loading: false,
        error: "",
        instance: {},   
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = async (userId, token) => {
        try {
            const data = await getBraintreeToken(userId, token) 
            if (data.error) {
                return setData({ ...data, error: data.error });
            } else {
                return setData({clientToken: data.clientToken });
            }
        }
        catch (err) {
            console.log(err);
        }    
    };

    useEffect(() => {
        getToken(userId, token);
    }, [userId, token]);


    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;    
        }, 0)
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-success">Se connecter</button>
            </Link>
        );
    };

    const buy = () => {
        setData({loading: true});
        let nonce; 
        data.instance.requestPaymentMethod()
        .then(data => {
            //console.log(data)
            nonce = data.nonce
            const paymentData = {
                paymentMethodNonce : nonce,
                amount: getTotal(products)
            };
            processPayment(userId, token, paymentData)
            .then(response => {
                console.log(response)
                const orderData = {
                    products: products,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount
                }
                createOrder(userId, token, orderData) 
                setData({ ...data, success: response.success }); 
                emptyCart(() => {
                    setData({loading: false , success: true});
                    console.log('paiement validé')   
                }); 
            })
            .catch(error => console.log(error));
        })
        .catch (error => {
            //console.log('drop error', error)
            setData({...data, error: error.message})
        })    
    }

    const showDropIn = () => (
        <div onBlur={() => setData({...data, error: ''})} >
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <DropIn
                        options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow:"vault"
                            },
                            locale: 'fr_FR'
                        }}
                        onInstance={instance => (data.instance = instance)}
                    />
                    <button onClick={buy} className="btn btn-success btn-block mb-5">Valider</button>
                </div>
            ) : null}
        </div>
    );

    const ShowError = error => ( 
        <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
            {error}   
        </div>
    )

    const showLoading = (loading) => ( 
        loading && (
        <div className="alert alert-info">
            <h5>Paiement en cours...</h5>  
        </div>
        )
    )

    const ShowSuccess = success => ( 
        <div className="alert alert-info" style={{display: success ? "" : "none"}}>
            <p>Votre Paiement a été validé, une e-mail de confirmation vous sera envoyé</p>
            <Link to="/">Revenir à la boutique</Link>
        </div>
    )

    return (
        <section id="cart-order">
            <div className="section">
                <div className="product-cart">
                    <div className="order-coupon">
                        <div className="order-button">
                            <div className="glob-price">
                                <div className="o-t">
                                    <span>Total :</span>
                                </div>
                                <div className="g-p">
                                    <span>{getTotal()}€</span>
                                </div>
                                {showLoading(data.loading)}
                            </div>
                            {ShowSuccess(data.success)}
                            {ShowError(data.error)}
                            {showCheckout()}
                        </div> 
                    </div> 
                </div>
            </div>
        </section>
    ) 
}

export default Checkout;