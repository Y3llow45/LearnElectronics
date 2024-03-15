import { displayInfo, displaySuccess } from '../components/Notify/Notify';
const url = 'http://localhost:5000/';

export const getLessonDetail = (title) => {
    return fetch(`${url}lesson/${title}`)
        .then(res => res.json()) 
        .then((data) => {
            return data;
        })
        .catch((error) => console.log(error));//displayError('Server error')
}

export const getAll = (pageNum) => {
    if(pageNum < 0){
        pageNum = 0;
    }
    return fetch(`${url}lessons/${pageNum}`)
        .then(res => res.json()) 
        .then((data) => {
            return data;
        })
        .catch((error) => console.log(error));
}

export const getMine = () => {
    const token = localStorage.getItem('token');
    if(!token) {
        displayInfo("You need to login first")
        return;
    }
    return fetch(`${url}edit`, {headers: {'Authorization': token}})
        .then(res => res.json()) 
        .then((data) => {
            return data;
        })
        .catch((error) => console.log(error));
}

export const getRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    return fetch(`${url}api/getUserRole`, {headers: {'Authorization': token}})
        .then(res => res.json()) 
        .then((data) => {
            return data
        })
        .catch(
            (error) => console.log(error)
        );
}

export const search = (category, keyword) => {
    return fetch(`${url}search/${category}/${keyword}`)
        .then(res => res.json())
        .then((data) => {
            return data;
        })
        .catch((error) => console.log(error));
};

export const getLiked = () => {
    const token = localStorage.getItem('token');
    if(!token) {
        displayInfo("You need to login first")
        return;
    }

    return fetch(`${url}search/liked`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }})
        .then(res => res.json())
        .then((data) => {
            return data;
        })
        .catch((error) => console.log(error));
}

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
};

export const add = (title, content, category) => {
    let lesson = {
        title,
        content,
        category,
    };
    const token = localStorage.getItem('token');
    if(!token) {
        displayInfo("You need to login first")
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
                displaySuccess("Add Successful");
            }
        })
        .catch(
            (error) => console.log(error)
        );
};

export const edit = (id, title, content, category) => {
    let lesson = {
        id,
        title,
        content,
        category,
    };
    const token = localStorage.getItem('token');
    if(!token) {
        displayInfo("You need to login first")
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
            res.json()
            if(res.status === 200){
                displaySuccess("Edit Successful");
            }
        })
        .then(data => {
            console.log(data);
        })
        .catch(
            //console.error('Error:', error);
            (error) => console.log(error)
        );
};

export const deleteLesson = (id) => {
    const token = localStorage.getItem('token');
    if(!token) {
        displayInfo("You need to login first")
        return;
    }
    
    return fetch(`${url}delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    })  
        .then(res => {
            res.json()
            if(res.status === 200){
                displaySuccess("Delete Successful");
            }
        })
        .catch(
            //console.error('Error:', error);
            (error) => console.log(error)
        );
};

export const like = (id) => {
    const token = localStorage.getItem('token');
    if(!token) {
        displayInfo("You need to login first")
        return;
    }
    
    return fetch(`${url}like/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    })  
        .then(res => {
            res.json();
            if(res.status === 200){
                displaySuccess("Added to liked");
            }
        })
        .catch(
            //console.error('Error:', error);
            (error) => console.log(error)
        );
};

export const unLike = (id) => {
    const token = localStorage.getItem('token');
    if(!token) {
        displayInfo("You need to login first")
        return;
    }
    
    return fetch(`${url}unlike/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    })  
        .then(res => {
            res.json()
            if(res.status === 200){
                displaySuccess("Removed from liked");;
            }
        })
        .catch(
            //console.error('Error:', error);
            (error) => console.log(error)
        );
};

export const checkEmail = (email) => {    
    return fetch(`${url}checkEmail/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })  
        .then(res => res.json())
        .then(data => {
            if(data.message === 'true'){
                displayInfo("Email already exists")
                return true;
            }
            return false;
        })
        .catch(
            (error) => console.log(error)
        );
};

export const checkUsername = (username) => {    
    return fetch(`${url}checkUsername/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })  
        .then(res => res.json())
        .then(data => {
            if(data.message === 'true'){
                displayInfo("Username already exists")
                return true;
            }
            return false;
        })
        .catch(
            (error) => console.log(error)
        );
};

export const checkDuplicate = (type,username) => {    
    return fetch(`${url}check/${type}/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })  
        .then(res => res.json())
        .then(data => {
            if(data.message === 'true'){
                displayInfo(`${type} already exists`)
                return true;
            }
            return false;
        })
        .catch(
            (error) => console.log(error)
        );
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