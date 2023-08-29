import React, { Component } from 'react';
import './SignUp.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { signUp } from '../../services/LessonServices';

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
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSignUp = (event) => {
        event.preventDefault();
        console.log(this.state.username, this.state.email, this.state.password);
        signUp(this.state.username, this.state.email, this.state.password)
            .then(res => {
                if(res.status === 201){
                    console.log('created!');
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
                    <h2 className='form-tittle'>Sign Up</h2>
                    <form className="signup-form" onSubmit={this.handleSignUp}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            className='input-form'
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            className='input-form'
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            className='input-form'
                            required
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
