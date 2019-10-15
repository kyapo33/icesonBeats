import React, {useState, useEffect} from 'react';
import Menu from '../core/Menu';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {getProducts, deleteProduct} from '../admin'

const ManageProducts = () => {
    const [products, setProducts] = useState([])

    const {user, token} = isAuthenticated()

    const loadProducts = async () => {
        try {
            const data = await getProducts();
            if(data.error) {
                console.log(data.error)
            } else {
                setProducts(data)
            }
        }
        catch (err) {
            console.log(err);
        }     
    }

    const destroy = async (productId) => {
        try {
            const data = await deleteProduct(productId, user._id, token);
            if(data.error) {
                console.log(data.error)
            } else {
                loadProducts()
            }
        }
        catch (err) {
            console.log(err);
        }     
    }

    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <div>
            <Menu/>
            <h2 className="jumbotron">Gérer les produits</h2>
            <div className="row">
                <div className="col-12">
                    <ul className="list-group">
                        {products.map((p,i) => (
                            <li key={i} className="list-group-item d-flex justify-content-center align-items-center">
                                <strong>{p.name}</strong>
                                <Link to={`/update/product/${p._id}`}>
                                    <span className="badge-warning badge-pill badge">Mette à jour</span>
                                </Link>
                                <span onClick={() => destroy(p._id)} className="badge-danger badge-pill badge">Supprimer</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ManageProducts;