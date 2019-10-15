import React, {useState} from "react";
import { resetPassword } from "../user";
import {Link} from 'react-router-dom'
import Menu from '../core/Menu'

const ResetPassword = ({match}) => {
    const [values, setValues] = useState({
        newPassword: '',
        error: '',
        success: false,
        info: true
    })

    const {newPassword, error, success, info} = values

    const handleChange = newPassword => event => {
        setValues({...values, error: false, [newPassword]: event.target.value})
    };
 
    const clickSubmit = async (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, info: true});
        try {
            const data = await resetPassword({newPassword: newPassword, resetPasswordLink: match.params.resetPasswordToken})
            if (data.error) {
                return setValues({...values, error: data.error, success: false, info: false}) 
            } else {
                return setValues({
                    ...values,
                    newPassword: '',
                    error: data.error,
                    success: true,
                    info: false
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

    const showSuccess = () => {
        if(success) {
            return <h3 className="text-success">Votre mot de passe a été modifié <Link to="/signin">Connectez-vous</Link></h3>
        }
    };

    const showInfo = () => ( 
        info && (
        <div>
            <h5>Veuillez entrer un nouveau mot de passe</h5>  
        </div>
        )
    )
     
    const ResetPasswordForm = () => (
        <form id="Login">
            {showInfo()}
            {showError()}
            {showSuccess()}
            <label className="control-label">Nouveau mot de passe</label>
            <div className="form-group">
                <input onChange={handleChange('newPassword')} type="password" className="form-control" value={newPassword}/>
                <p className="help-block">Le mot de passe doit être de minimun 8 lettres et doit contenir au moins un chiffre</p>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Valider</button>    
        </form>
    );

    return (
        <div>
            <Menu/>
            <div id="LoginForm">
                <div className="container">
                    <div className="login-form">
                        <div className="main-div-2">
                            {ResetPasswordForm()}
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default ResetPassword;