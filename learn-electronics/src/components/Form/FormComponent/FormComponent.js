import React from 'react';

const FormComponent = ({ username, password, handleInputChange, checkFunc }) => {
    return (
        <div>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleInputChange}
                onBlur={checkFunc}
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
