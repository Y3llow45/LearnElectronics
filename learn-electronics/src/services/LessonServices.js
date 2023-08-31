const url = 'http://localhost:5000/';

export const getAll = () => {
    return fetch(`${url}lessons`)
        .then(res => res.json())
        .then((data) => {
            console.log('JSON response:', data); 
            return data;
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
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

export const signIn = (email, password) => {
    let user = {
        email,
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
                console.log('Logged in!')
            }
        })
        .catch(error => {
            console.error('Error signing in:', error);
        });
};

export const add = (tittle, content, category) => {
    let lesson = {
        tittle,
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
        .then(response => response.json())
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