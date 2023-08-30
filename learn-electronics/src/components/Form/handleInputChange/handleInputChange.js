const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/;

export const handleInputChangeComponent = (event, setStateCallback) => {
    const { name, value } = event.target;
    if(name === 'password'){
        if(!passwordPattern.test(value)){
            console.log('weak pass bro', value);
        }
    }
    setStateCallback({ [name]: value });
};