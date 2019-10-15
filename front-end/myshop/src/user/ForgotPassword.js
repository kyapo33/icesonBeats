import React, {useState} from "react";
import { forgotPassword } from "../user";
import Menu from '../core/Menu'

const ForgotPassword = () => {
    const [values, setValues] = useState({
        email: '',
        error: '',
        success: false,
        info: true,
    })

    const { email, error, success, info} = values

    const handleChange = email => event => {
        setValues({...values, error: false, [email]: event.target.value})
    };
 
    const clickSubmit = async event => {
        event.preventDefault();
        setValues({ ...values, error: false, info: true});
        try {
            const data = await forgotPassword({email: email}) 
            if (data.error) {
               return setValues({...values, error: data.error, success: false, info: false}) 
            } else {
                return setValues({
                    ...values,
                    email: '',
                    error: '',
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
            return <h3 className="text-success">Un e-mail vous a été envoyé</h3>
        }
    };

    const showInfo = () => ( 
        info && (
        <div>
            <h5>Veuillez renseigner votre adresse e-mail</h5>  
        </div>
        )
    )
     
    const ForgotPasswordForm = () => (
        <form id="Login">
            {showInfo()}
             {showError()}
             {showSuccess()}
            <label className="control-label">E-mail</label>
            <div className="form-group">
                <input onChange={handleChange('email')} type="text" className="form-control" value={email}/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary mt-2">Valider</button>    
        </form>
    );

    return (
        <div>
            <Menu/>
            <div id="LoginForm">
                <div className="container">
                    <div className="login-form">
                        <div className="main-div-2">
                            {ForgotPasswordForm()}
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default ForgotPassword;