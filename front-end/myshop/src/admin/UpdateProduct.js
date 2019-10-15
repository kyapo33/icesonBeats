import React, {useState, useEffect} from 'react';
import Menu from '../core/Menu';
import {isAuthenticated} from '../auth';
import {Redirect} from 'react-router-dom';

import {getProduct, getCategories, updateProduct} from '../admin'

const UpdateProduct = ({match}) => {

    const [values, setValues] = useState({
        name: '',
        price: '',
        category: '',
        categories: [],
        iframe: '',
        quantity: '',
        download: '',
        loading: false,
        error: '', 
        createdProduct: '',
        redirectToProfile: false
    })

    const {user, token} = isAuthenticated();

    const initCategories = async () => {
        try {
            const data = await getCategories()
            if(data.error) {
                return setValues({...values, error: data.error})
            } else {
                return setValues({categories: data})
            }
        }
        catch (err) {
            console.log(err);
        }   
    }

    const init = async (productId) => {
        try {
            const data = await getProduct(productId);
            if(data.error) {
                return setValues({...values, error: data.error})
            } else {
                setValues({...values, name: data.name, iframe: data.iframe, price: data.price, category: data.category._id, quantity: data.quantity, download: data.download})
                return initCategories()
            }
        }
        catch (err) {
            console.log(err);
        } 
    }

    useEffect(() => {
        init(match.params.productId);
    // eslint-disable-next-line
    }, []);

    const {
        name,
        price,
        category,
        categories,
        iframe,
        quantity,
        download,
        loading,
        error,
        createdProduct,
        redirectToProfile
    } = values

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    };

    const clickSubmit = async (e) => {
        e.preventDefault()
        setValues({...values, error:'', loading: true})
        try {
            const data = await updateProduct(match.params.productId, user._id, token, {name: name, iframe: iframe, price: price, category: category, quantity: quantity, download: download})
            if(data.error) {
                return setValues({...values, error: data.error})
            } else {
                return setValues({
                    ...values,  
                    name: '',
                    price: '',
                    category: '',
                    iframe: '',
                    quantity: '',
                    download: '',
                    redirectToProfile: true,
                    loading: false,
                    createdProduct: data.name
                })
            }  
        } 
        catch (err) {
            console.log(err);
        }   
    };
    
    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-sucess" style={{display: createdProduct ? '' : 'none'}}>
            <h2> {`${createdProduct}`} a été modifié </h2>
        </div>
    )

    const showLoading = () => ( 
        loading && (
        <div className="alert alert-info">
            <h2>Chargement...</h2>  
        </div>
        )
    )
    const redirectUser = () => {
        if(redirectToProfile) {
            if(!error) {
                return <Redirect to="/manage/product"/>
            }
        }   
     }

    const newPostForm = () => (
        <form className="mb-3" >
            <div className="form-group">
                <label className="text-muted">Titre</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name}/>
            </div>
            <div className="form-group">
                <label className="text-muted">iframe</label>
                <input onChange={handleChange('iframe')} type="text" className="form-control" value={iframe}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Prix</label>
                <input onChange={handleChange('price')} type="text" className="form-control" value={price}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Categorie</label>
                <select onChange={handleChange('category')} type="text" className="form-control"> 
                <option >Choisir une catégorie</option>)
                    {categories && categories.map((c, i) => 
                        (<option key={i} value={c._id}>{c.name}</option>))}
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Quantité</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Lien de téléchargement</label>
                <input onChange={handleChange('download')} type="text" className="form-control" value={download}/>
            </div>
            <button onClick={clickSubmit} className="btn btn-success">Valider</button>
        </form>
    )

    return (
        <div>
            <Menu/>
            <h2 className="jumbotron">Ajouter un nouveau produit</h2>
            <div className = "row">
                <div className = "col-md-8 offset-md-2" >
                {showLoading()}
                {showSuccess()}
                {showError()}   
                {newPostForm()}
                {redirectUser()}
                </div>
            </div>
        </div>
    );
}

export default UpdateProduct;