import { displayLoginNotification } from '../components/Notify/Notify';
const url = 'http://localhost:5000/';

export const getAll = (pageNum) => {
    return fetch(`${url}lessons/${pageNum}`)
        .then(res => res.json()) 
        .then((data) => {
            console.log('JSON response:', data); 
            return data;
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
    });
}

export const getMine = () => {
    const token = localStorage.getItem('token');
    if(!token) {
        console.log('Login first');
        return;
    }
    return fetch(`${url}edit`, {headers: {'Authorization': token}})
        .then(res => res.json()) 
        .then((data) => {
            console.log('JSON response:', data); 
            return data;
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
    });
}

export const getRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    return fetch(`${url}api/getUserRole`, {headers: {'Authorization': token}})
        .then(res => res.json()) 
        .then((data) => {
            console.log(data)
            return data
        })
        .catch((error) => {
            console.error('Error fetching data', error)
        });
}

export const search = (category, keyword) => {
    return fetch(`${url}search/${category}/${keyword}`)
        .then(res => res.json())
        .then((data) => {
            return data;
        })
        .catch(error => console.log(error));
};

export const signUp = (username, email, password) => {
    let user = {
        username,
        email,
        password,
    };
    
    return fetch(`${url}signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });
};

export const signIn = (username, password, updateUsername) => {
    let user = {
        username,
        password,
    };
    
    return fetch(`${url}signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })  
        .then(res => res.json())
        .then(data => {
            if(data.token){
                localStorage.setItem('token', data.token)
                localStorage.setItem('username', data.username)
                updateUsername(data.username);
                console.log('Logged in!')
            }
        })
        .catch(error => {
            console.error('Error signing in:', error);
        });
};

export const add = (title, content, category) => {
    let lesson = {
        title,
        content,
        category,
    };
    const token = localStorage.getItem('token');
    if(!token) {
        console.log('Login first');
        return;
    }
    
    return fetch(`${url}add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(lesson)
    })  
        .then(res => {
            res.json()
            if(res.status === 201){
                console.log('Created!');
                displayLoginNotification("Add Successful");
            }
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

export const edit = (id, title, content, category) => {
    let lesson = {
        id,
        title,
        content,
        category,
    };
    console.log('edit service')
    const token = localStorage.getItem('token');
    if(!token) {
        console.log('Login first');
        return;
    }
    
    return fetch(`${url}edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(lesson)
    })  
        .then(res => {
            console.log('before json()');
            res.json()
            if(res.status === 200){
                console.log('Updated!');
                displayLoginNotification("Edit Successful");
            }
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

/*
export const update = (petId, pet) => {
    return fetch(`${url}/${petId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pet)
    });
};

export const pet = (petId, likes) => {
    return fetch(`${url}/${petId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({likes})
    })
        .then(res => res.json());
}*/