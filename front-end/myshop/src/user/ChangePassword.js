import React, {useState, useEffect} from 'react'
import Menu from '../core/Menu';
import {Link} from 'react-router-dom'
import {isAuthenticated} from '../auth';
import {read, changeUserPassword} from '../user'

const ChangePassword = ({match}) => {    
    const [values, setValues] = useState({
        email: '',
        password: '',
        changedPassword: '',
        error: '',
        success: false
    })   
    
    const {token} = isAuthenticated()

    const {email, password, changedPassword, success, error} = values

    const init = async (userId) => {
        try {
            const data = await read(userId, token);
            if(data.error) {
                return setValues({...values, error: true})
            } else {
                return setValues({...values, email: data.email})
            }
        }
        catch (err) {
            console.log(err);
        } 
    }

    useEffect(() => {
        init(match.params.userId)
        // eslint-disable-next-line
    }, [])

    const handleChange = email => e => {
        setValues({...values, error: false, [email]: e.target.value})   
    }

    const clickSubmit = async (e) => {
        e.preventDefault()
        setValues({...values, error : false})
        try {
            const data = await changeUserPassword(match.params.userId, token, {email: email, password: password, changedPassword: changedPassword})
            if(data.error) {
                return setValues({...values, error: data.error, success: false})    
            } else {
                return setValues({
                    ...values, 
                    email: data.email, 
                    password: '',
                    changedPassword: '',
                    success: true,
                    error: '',
                });
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
        <div className="alert alert-success" style={{display: success ? '' : 'none'}}>
           Votre mot de passe a été modifié revenir au <Link to="/user/dashboard">profil</Link>  
        </div>)

    const changePasswordForm = () => (
        <form id="Login">
            {showError()}
            {showSuccess()}
            <label className="control-label">Mot de passe</label>
            <div className="form-group">
                <input onChange={handleChange('password')} type="password" className="form-control" value={password}/>
                <p className="help-block">Le Mot de passe doit être de minimun 8 lettres et doit contenir au moins un chiffre</p>
            </div>
            <label className="control-label">Nouveau mot de passe</label>
            <div className="form-group">
                <input onChange={handleChange('changedPassword')} type="password" className="form-control" value={changedPassword}/>
                <p className="help-block">Le Mot de passe doit être de minimun 8 lettres et doit contenir au moins un chiffre</p>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">valider</button>    
        </form>
    );

    return (
        <div>
        <Menu/>
        <div id="LoginForm">
            <div className="container">
                <div className="login-form">
                    <div className="main-div-2">
                        {changePasswordForm()} 
                    </div>
                </div>
            </div>
        </div>
    </div> 
    );
}

export default ChangePassword;