import React, { Component } from 'react';
import './SignUp.css'; // Import your CSS file for styling
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

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
        console.log(this.state.username, this.state.email, this.state.password)
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
                        <button type="submit">Sign Up</button>
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
