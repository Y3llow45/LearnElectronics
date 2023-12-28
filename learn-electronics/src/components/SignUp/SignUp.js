import React, { Component } from 'react';
import './SignUp.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { signUp, checkEmail, checkUsername } from '../../services/LessonServices';
import FormComponent from '../Form/FormComponent/FormComponent';
import {handleInputChangeComponent} from '../Form/handleInputChange/handleInputChange';
import { displayError, displayInfo, displaySuccess } from '../Notify/Notify';
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/;

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: ''
        };
    }

    handleInputChange = (event) => {
        handleInputChangeComponent(event, this.setState.bind(this));
    }

    checkEmail = () => {
        checkEmail(this.state.email)
    }

    checkUsername = () => {
        checkUsername(this.state.username);
    }

    handleSignUp = (event) => {
        event.preventDefault();
        if(this.checkEmail()) {
            displayInfo("Email already exists")
        }
        if(this.checkUsername()) {
            displayInfo("Username already exists")
        }
        if(!passwordPattern.test(this.state.password)){
            displayInfo("Weak password")
        }else {
            signUp(this.state.username, this.state.email, this.state.password)
                .then(res => {
                    if(res.status === 201){
                        displaySuccess("Account created")
                    }else {
                        displayError("No response from server")
                    }
                })
                .catch((error) => console.log(error))
        }
    };

    render() {
        return (
            <div className="signup-container-border">
                <div className='signup-container'>
                    <h2 className='form-tittle'>Sign Up</h2>
                    <form className="signup-form" onSubmit={this.handleSignUp}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            className='input-form'
                            onBlur={this.checkEmail}
                            required
                        />
                        <FormComponent 
                            username={this.state.username}
                            password={this.state.password}
                            handleInputChange={this.handleInputChange}
                            checkFunc={this.checkUsername}
                        />
                        <br></br>
                        <button type="submit" className='form-submit'>Sign Up</button>
                    </form>
                    <div className="signin-link">
                        <p>Already have an account? <NavLink to="/signin">Sign In</NavLink></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;
