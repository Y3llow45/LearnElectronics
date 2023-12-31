import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './SignIn.css';
import { signIn } from '../../services/LessonServices';
import FormComponent from '../Form/FormComponent/FormComponent';
import { useAuth } from '../../contexts/AuthContext';
import { displayError } from '../Notify/Notify';
import {useUser} from '../../contexts/UserContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const SignIn = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    username: '',
  });

  const history = useHistory();

  const {setUsername} = useAuth();
  const { setUserRole } = useUser();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updatedState = { ...state, [name]: value };
    setState(updatedState);
  };

  const handleSign = (event) => {
    event.preventDefault();
    signIn(state.username, state.password, setUsername)
      .then((data) => {
        if (data.token && data.username) {
          setUsername(data.username);
          setUserRole(data.role);
          history.push('/lessons/0')
        } else {
          displayError("Status error")
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="signup-container-border">
      <div className="signup-container">
        <h2 className="form-tittle">Sign In</h2>
        <form className="signup-form" onSubmit={handleSign}>
          <FormComponent
            username={state.username}
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
