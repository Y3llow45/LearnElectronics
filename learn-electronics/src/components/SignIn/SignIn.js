import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './SignIn.css';
import { signIn } from '../../services/LessonServices';
import FormComponent from '../Form/FormComponent/FormComponent';
import { useAuth } from '../../contexts/AuthContext';
//import { handleInputChangeComponent } from '../Form/handleInputChange/handleInputChange';

const SignIn = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    username: '',
  });

  const {setUsername} = useAuth();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    // Use the spread operator to copy the current state
    const updatedState = { ...state, [name]: value };
    
    // Update the state with the new values
    setState(updatedState);
  };

  /*const handleUsernameUpdate = (newUsername) => {
    // Update only the username property in the state
    setState({ ...state, username: newUsername });
  };*/
  

  const handleSign = (event) => {
    event.preventDefault();
    console.log(state.email, state.password);
    signIn(state.email, state.password, setUsername)
      .then((res) => {
        if (res.status === 200) {
          console.log('Logged in!');
          setUsername(res.username);
        } else {
          console.error(`Error: ${res.statusText}`);
        }
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  };

  return (
    <div className="signup-container-border">
      <div className="signup-container">
        <h2 className="form-tittle">Sign In</h2>
        <form className="signup-form" onSubmit={handleSign}>
          <FormComponent
            email={state.email}
            password={state.password}
            handleInputChange={handleInputChange}
          />
          <br></br>
          <button type="submit" className="form-submit">
            Sign In
          </button>
        </form>
        <div className="signin-link">
          <p>
            Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
