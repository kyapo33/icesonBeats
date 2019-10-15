import React, {Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuthenticated} from '../auth'
import {itemTotal} from './cartHelpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faPowerOff, faBars, faTimes} from '@fortawesome/free-solid-svg-icons'
import ResponsiveMenu from 'react-responsive-navbar';

const Menu = ({history}) => ( 
    <section id="header">
        <div className="header-continer">
            <div className="section">
                <div className="nav-menu nav-demo-2">
                <ResponsiveMenu
                menuOpenButton={<FontAwesomeIcon style={{color: "#ffffff"}} icon={faBars}/>}
                menuCloseButton={<FontAwesomeIcon style={{color: "#ffffff"}} icon={faTimes}/>}
                changeMenuOn="768px"
                largeMenuClassName="large-menu"
                smallMenuClassName="small-menu"
                menu={
                    <ul className="nav flex-column">
                        <li>
                            <Link className = "nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        {isAuthenticated() && isAuthenticated().user.role === 0 && (
                            <li>
                                <Link className = "nav-link" to="/user/dashboard">
                                    Mon Compte
                                </Link>
                            </li>
                        )}
                        {isAuthenticated() && isAuthenticated().user.role === 1 && (
                            <li>
                                <Link className = "nav-link" to="/admin/dashboard">
                                    Mon Compte
                                </Link>
                            </li>
                        )}
                        {!isAuthenticated() && (
                            <Fragment>
                                <li>
                                    <Link className = "nav-link" to="/signin">
                                        Se connecter
                                    </Link>
                                </li>
                                <li>
                                    <Link className = "nav-link" to="/signup">
                                        S'inscrire
                                    </Link>
                                </li>   
                            </Fragment>   
                        )}
                        {isAuthenticated() && (
                            <li>
                                <Link className = "nav-link" to="/"   style={{ cursor: "pointer"}}
                                    onClick={() => 
                                        signout(() => {
                                            history.push('/');    
                                        })}>
                                    <FontAwesomeIcon icon={faPowerOff}/>
                                </Link>
                            </li>   
                        )}
                         <li>
                            <Link className = "nav-link" to="/contact">
                                Contact
                            </Link>
                        </li>
                    </ul>}/>
                </div>
                <div className="header_items">
                    <div className="shop_icon">
                        <Link className = "nav-link" to="/cart">
                            <FontAwesomeIcon style={{color: "#ffffff"}} icon={faShoppingBasket}/>
                            <span className="card_count">{itemTotal()}</span>
                        </Link>                        
                    </div>
                </div>
            </div>
        </div>
    </section>
)

 


export default withRouter(Menu);