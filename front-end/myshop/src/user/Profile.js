import React, {useState, useEffect} from 'react';
import Menu from '../core/Menu';
import {isAuthenticated} from '../auth';
import {Link, Redirect} from 'react-router-dom'
import {read, update, updateUser} from '../user'

const Profile = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        city: '',
        country: '',
        error: '',
        success: false
    })

    const {user, token} = isAuthenticated()

    const {name, email, city, country, success, error } = values

    const init = (userId) => {
        read(userId, token).then(data => {
            if(data.error) {
                setValues({...values, error: true})
            } else {
                setValues({...values, name: data.name, email: data.email, city: data.city, country: data.country})
            }
        })
    }

    useEffect(() => {
        init(match.params.userId)
        // eslint-disable-next-line
    }, [])

    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value})   
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        setValues({...values, error : false})
        update(match.params.userId, token, {name: name, email: email, city: city, country: country})
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, success: false})    
                console.log(data.error)
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values, 
                        name: data.name, 
                        email: data.email, 
                        city: data.city, 
                        country: data.country, 
                        success: true,
                        error: '',
                    });
                })
            }
        })     
    };

    const redirectUser = (success) => {
        if(success) {
            return <Redirect to="/user/dashboard"/>
        }
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const profileUpdate = (name, email, city, country) => (
        <form id="Login">
            <label className="control-label">Nom</label>
            <div className="form-group">
                <input onChange={handleChange('name')} type="text" className="form-control capital" value={capitalize(name)}/>
            </div>
            <label className="control-label">E-mail</label>
            <div className="form-group">
                <input onChange={handleChange('email')} type="text" className="form-control" value={email}/>
            </div>
            <label className="control-label">Ville</label>
            <div className="form-group">
                <input onChange={handleChange('city')} type="text" className="form-control capital" value={capitalize(city)}/>
            </div>
            <label className="control-label">Pays</label>
            <div className="form-group">
                <input onChange={handleChange('country')} type="text" className="form-control capital" value={capitalize(country)}/>
            </div>
            {showError()}
            <button onClick={clickSubmit} className="btn btn-primary mt-2">Valider</button><br/>
            <Link to={`/user/change-password/${user._id}`}>
                <button className="btn btn-primary mt-3 forgot-button">Changer de mot de passe</button> 
            </Link>  
        </form>
    ) 

    return ( 
            <div>
            <Menu/>
            <div id="LoginForm">
                <div className="container">
                    <div className="login-form">
                        <div className="main-div-2">
                            {profileUpdate(name, email, city, country )} 
                            {redirectUser(success)} 
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
}
      
export default Profile;