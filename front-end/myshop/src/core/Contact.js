import React, {useState} from 'react'
import Menu from '../core/Menu'
import {sendContact} from '../core'

const Contact = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        message: '',
        error: '',
        success: false
    })

    const {name, email, message, success, error} = values

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    };

    const clickSubmit = async (event) => {
        event.preventDefault();
        setValues({...values, error : false})
        try {
            const data = await sendContact({name : name, email : email, message : message})
            if (data.error) {
                return setValues({...values, error: data.error, success: false})    
            } else {
                return setValues({
                    ...values,
                    name: '',
                    email: '',
                    message: '',
                    error: '',
                    success: true
                })
            }
        }
        catch (err) {
            console.log(err);
        } 
    } 
    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error} 
        </div>
    )
    
    const showSuccess = () => ( 
        <div className="alert alert-success" style={{display: success ? '' : 'none'}}>
            <p>Votre message a été envoyé</p> 
        </div>
    )
    
    const contactForm = () => (
        <div className="form">
            <form>
                <div className="row fild_1">
                    <div className="col-sm-6">
                        <input onChange={handleChange('name')} type="text" className="form-control" placeholder="Nom" value={name}/>
                    </div>
                    <div className="col-sm-6">
                        <input onChange={handleChange('email')} type="text" className="form-control" placeholder="E-mail" value={email}/>
                    </div>
                </div>
                <div className="form-group">
                    <textarea  onChange={handleChange('message')} className="form-control" id="exampleFormControlTextarea1" rows="3" value={message}></textarea>
                </div>
                <button type="submit" onClick={clickSubmit}  className="btn btn-primary">Envoyer</button>
            </form>
        </div>       
    );
   
    return (
        <div>
            <Menu/>
            <section id="contact-us" className="section_8 contact-form">
                <div className="overly"></div>
                <div className="section">
                    <div className="contact-info">
                        <h2>Contact</h2>
                        {showSuccess()}
                        {showError()}
                    </div>
                    {contactForm()}
                </div>
            </section>
        </div>                      
    );
}

export default Contact;