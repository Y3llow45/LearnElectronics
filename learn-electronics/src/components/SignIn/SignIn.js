import React, { Component } from 'react';
import './SignIn.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { signIn } from '../../services/LessonServices';
import FormComponent from '../Form/FormComponent/FormComponent';
import {handleInputChangeComponent} from '../Form/handleInputChange/handleInputChange';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usernameOrEmail: '',
            password: ''
        };
    }

    handleInputChange = (event) => {
        handleInputChangeComponent(event, this.setState.bind(this));
    }

    handleSign = (event) => {
        event.preventDefault();
        console.log(this.state.usernameOrEmail, this.state.password);
        signIn(this.state.usernameOrEmail, this.state.password)
            .then(res => {
                if(res.status === 201){ //What status code do i need to send if logging was successful?
                    console.log('Logged in!');
                }else {
                    console.error(`Error: ${res.statusText}`)
                }
            })
            .catch(err => {
                console.error(`Error: ${err}`)
            })
    };

    render() {
        return (
            <div className="signup-container-border">
                <div className='signup-container'>
                    <h2 className='form-tittle'>Sign In</h2>
                    <form className="signup-form" onSubmit={this.handleSign}>
                        <FormComponent email={this.state.email}
                            password={this.state.password}
                            handleInputChange={this.handleInputChange}/>
                        <br></br>
                        <button type="submit" className='form-submit'>Sign In</button>
                    </form>
                    <div className="signin-link">
                        <p>Don't have an account? <NavLink to="/signup">Sign Up</NavLink></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;
