import React, { useState, useEffect } from 'react';
import Menu from '../core/Menu';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom'
import { getOrderHistory } from '../user'
import Moment from 'react-moment';
import 'moment-timezone';

const Dashboard = () => {
    const [history, sethistory] = useState([])
    const [showDetails, setShowDetails] = useState(false);
    const [showOrders, setShowOrders] = useState(false);
    const [showUserInfo, setShowUserInfo] = useState(false); 

    const { user: { _id, name, email, city, country } } = isAuthenticated();

    const token = isAuthenticated().token

    const init = (userId, token) => {
        getOrderHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                sethistory(data)
            }
        })
    }

    useEffect(() => {
        init(_id, token)
        // eslint-disable-next-line
    }, [])

    const userLinks = () => {
        return (
            <div className = "card card-links mb-3">
                <h4 className="card-header">Bonjour, {name}</h4>
                <ul className = "list-group">
                    <li className="list-group-item links">
                        <Link className="nav-link" style={{color: "#2ac1b7"}}  to="/user/dashboard">
                            Mes informations
                        </Link>
                    </li> 
                    <li className="list-group-item links">
                        <Link className="nav-link" style={{color: "#2ac1b7"}} to={`/profile/update/${_id}`}>
                            Editer  mon profil
                        </Link>
                    </li>  
                    <li className="list-group-item links">
                        <Link className="nav-link" style={{color: "#2ac1b7"}} to="/cart">
                            Mon panier
                        </Link>
                    </li>                
                </ul>     
            </div> 
        )
    };

    const userInfo = () => {
        return (
            <div className="card card-info mb-3">
                <table className="table table-hover ">
                    <tbody>
                        <tr>
                            <td><h4>Mes Informations</h4></td>
                            <td><p onClick={() => setShowUserInfo(!showUserInfo)} className="btn btn-sm button-details btn-info">Details</p> </td>
                        </tr> 
                    </tbody>
                </table>    
                {showUserInfo && <ul className="list-group">
                    <li className="list-group-item">Nom : {name}</li>
                    <li className="list-group-item">Adresse e-mail : {email}</li>
                    <li className="list-group-item">Ville : {city}</li>
                    <li className="list-group-item">Pays : {country}</li>
                </ul>}
            </div>
        )
    };

    const userHistory = (history) => {
        return (
            <div className="card card-order mb-5">
                <table className="table table-order table-hover ">
                    <tbody>
                        <tr>
                            <td><h4>Mes Commandes</h4></td>
                            <td><p onClick={() => setShowOrders(!showOrders)} className="btn btn-sm button-order btn-info">Details</p> </td>
                        </tr> 
                    </tbody>
                </table>    
                {showOrders && <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((o, oIndex) => {
                            return (
                                <div className="card card-history"
                                    key={oIndex}>
                                    <table className="table table-hover ">
                                        <tbody>
                                            <tr>
                                                <th><p>N° de commande : {o._id}</p></th>
                                                <button onClick={() => setShowDetails(showDetails === o._id ? false : o._id)} className="btn btn-sm btn-info common-class button-history mt-2"><i className="fas fa-info-circle"></i>Voir plus</button>
                                            </tr> 
                                        </tbody>
                                    </table>                              
                                    {showDetails === o._id && <div className="more">
                                        <ul className="list-group mb-2">
                                            <li className="list-group-item">Etat de la commande: {o.status}</li>
                                            <li className="list-group-item">N° de la transaction: {o.transaction_id}</li>
                                            <li className="list-group-item">Montant: {o.amount}€</li>
                                            <li className="list-group-item">Date: <Moment format="YYYY/MM/DD HH:mm">{o.createdAt}</Moment></li>
                                        </ul>
                                        <h5 className="mt-4 mb-4 ml-3">
                                            Contenu de ma commande
                                        </h5>
                                        {o.products.map((p, pIndex) => (
                                            <div className="" key={pIndex}>
                                                <div className="row mb-3">
                                                    <div className="col-lg-4">
                                                       <p style={{color: "#2ac1b7" }}>{p.name}</p>   
                                                    </div>
                                                    <div className="col-lg-2">
                                                        Prix: {p.price} €  
                                                    </div>
                                                    <div className="col-lg-6">
                                                        Référence: {p._id}  
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>}
                                </div>
                            )
                        })}
                    </li>
                </ul>}
            </div>
        )
    };

    return (
        <div className="container mt-5">
            <Menu />
            <div className="userinterface">
                <div className="row">
                    <div className="col-lg-3">
                        {userLinks()}
                    </div>
                    <div className="col-lg-9" >
                        {userInfo()}
                        {userHistory(history)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;