import React from 'react';

const FormComponent = ({ usernameOrEmail, password, handleInputChange }) => {
    return (
        <div>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={usernameOrEmail}
                onChange={handleInputChange}
                className='input-form'
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleInputChange}
                className='input-form'
                required
            />
        </div>
    );
}

export default FormComponent;