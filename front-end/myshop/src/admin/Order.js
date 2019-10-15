import React, {useState, useEffect} from 'react';
import Menu from '../core/Menu';
import {isAuthenticated} from '../auth';
import {listOrders} from '../admin'
import Moment from 'react-moment';
import 'moment-timezone';

const Orders = () => {
    const [orders, setOrders] = useState([])

    const{user, token} = isAuthenticated()

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await listOrders(user._id, token);
                if(data.error) {
                    console.log(data.error)   
                } else {
                    return setOrders(data) 
                }  
            }
            catch (err) {
                console.log(err);
            }    
        }
        loadOrders()
    }, [user._id, token])

    const showOrdersLength = orders => {
        if (orders.length > 0) {
            return (
                <h1 className="text-danger">Nombre de commandes {orders.length}</h1>
            )
        } else {
            return <h1 className="text-danger">Aucune commandes</h1>
        }
    };

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>  
            </div>
            <input type="text" value= {value} className="form-control" readOnly />
        </div>    
    )

    return (
        <div>
            <Menu/>
            <h2 className="jumbotron">Les commandes passées</h2>
            <div className = "row">
                <div className = "col-md-8 offset-md-2" >
                    {showOrdersLength(orders)}
                    {orders.map((o, oIndex) => {
                        return (
                            <div className="mt-5" 
                            key={oIndex} 
                            style={{borderBottom: '5px solid indigo'}} >
                                <h2 className="mb-5">
                                    <span className="bg-primary">N° de commande : {o._id}</span>
                                </h2> 
                                <ul className="list-group mb-2">
                                    <li className="list-group-item">Nom: {o.user.name}</li>
                                    <li className="list-group-item">Email: {o.user.email}</li>
                                    <li className="list-group-item">Status: {o.status}</li>
                                    <li className="list-group-item">N° de la transaction: {o.transaction_id}</li>
                                    <li className="list-group-item">Total: {o.amount}€</li>
                                    <li className="list-group-item">Date: <Moment parse="YYYY-MM-DD HH:mm">{o.createdAt}</Moment></li>
                                </ul>  
                                <h3 className="mt-4 mb-4 font-italic">
                                    Nombre de produits dans la commande: {o.products.length}
                                </h3> 
                                { o.products.map((p, pIndex) => (
                                    <div className="mb-4" key={pIndex} style={{padding: '20px', border: '1px solid indigo'}} >
                                        {showInput('Nom', p.name)}
                                        {showInput('Prix', p.price)} 
                                        {showInput('Quantité', p.count)} 
                                        {showInput('Référence', p._id)}     
                                    </div>
                                ))}
                            </div>
                        )    
                    })}
                </div>
            </div>
        </div>
    );
}

export default Orders