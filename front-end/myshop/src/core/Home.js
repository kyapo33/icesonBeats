import React, {useState, useEffect} from 'react'
import Menu from './Menu'
import banner from '../img/Home.png';
import {getProducts} from '../core'
import ShowProduct from "./ShowProduct";
import {getCategories} from '../admin';
import {Link} from "react-router-dom"

const Home = () => {
    const [products, setProducts] = useState('')
    const [categories, setCategories] = useState([])
    // eslint-disable-next-line
    const [error, setError] = useState(false)

    const loadProducts = async () => {
        try {
            const data = await getProducts('createdAt'); 
            if(data.error) {
                return setError(data.error)
            } else {
                return setProducts(data)
            }
        }
        catch (err) {
            console.log(err);
        }  
    }

    const init = async () => {
        try {
            const data = await getCategories();
            if(data.error) {
                return setError(data.error)
            } else {
                return setCategories(data)
            } 
        }
        catch (err) {
            console.log(err);
        }     
    }

    useEffect(() => {
        init();
        loadProducts()
    // eslint-disable-next-line
    }, []);

    const showCategories = () => {
        return categories.map ((c, i) => (
            <Link style={{color: "#ffffff"}} to={`/category/${c._id}`} key={i} className="dropdown-item">{c.name}</Link> 
        ))
    }

    return (
        <div>
        <Menu/>
        <div className="bg_image">
            <img src={banner} alt="banner-1"/>
        </div>
        <div id="shop-contanier">
            <div className="section">
                <div className="results">
                    <div className="results-select">
                        <div className="btn-group mt-2"  >
                            <button className="btn btn-primary dropdown-toggle" data-toggle="dropdown">Catégories<span className="caret"></span></button>
                            <ul className="dropdown-menu">
                                {showCategories()}
                            </ul>  
                            </div>    
                        </div>
                        <div className="shop-items">
                            {products && products.map((product, i) => (
                            <ShowProduct key={i} product={product} />
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;