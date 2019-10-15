import React, {useState} from 'react'
import Menu from '../core/Menu'
import {signup} from '../auth'

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        city: '',
        country: '',
        error: '',
        success: false
    })

    const {name, email, password, city, country, success, error} = values

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    };

    const clickSubmit = async (event) => {
        event.preventDefault();
        setValues({...values, error : false})
        try {
            const data = await signup({name : name, email : email, password : password, city : city, country : country}) 
            if (data.error) {
                return setValues({...values, error: data.error, success: false})    
            } else {
                return setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    city: '',
                    country: '',
                    error: '',
                    success: true
                })
            }   
        }
        catch (err) {
            console.log(err);
        } 
    }

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const signUpForm = () => (
        <form id="Login">
            {showSuccess()}
            {showError()}
            <label className="control-label">Nom</label>
            <div className="form-group">
                <input onChange={handleChange('name')} type="text" className="form-control" value={capitalize(name)}/>
            </div>
            <label className="control-label">E-mail</label>
            <div className="form-group">
                <input onChange={handleChange('email')} type="text" className="form-control" value={email}/>
            </div>
            <label className="control-label">Mot de passe</label>
            <div className="form-group">
                <input onChange={handleChange('password')} type="password" className="form-control" value={password}/>
                <p className="help-block">Le Mot de passe doit être de minimun 8 lettres et doit contenir au moins un chiffre</p>
            </div>
            <label className="control-label">Ville</label>
            <div className="form-group">
                <input onChange={handleChange('city')} type="text" className="form-control" value={capitalize(city)}/>
            </div>
            <label className="control-label">Pays</label>
            <div className="form-group">
                <input onChange={handleChange('country')} type="text" className="form-control" value={capitalize(country)}/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary btn-lg">S'inscrire</button>    
        </form>
    );
   
    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )
    
    const showSuccess = () => ( 
        <div className="alert alert-success" style={{display: success ? '' : 'none'}}>
            <p>Votre compte a bien été créer. Vérifiez votre boîte mail pour vous connecter</p>  
        </div>
    )
    
    return (
        <div>
            <Menu/>
            <div id="LoginForm">
                <div className="container">
                    <div className="login-form">
                        <div className="main-div-2">
                            {signUpForm()}
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default Signup;