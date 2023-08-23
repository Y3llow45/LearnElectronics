const url = 'http://localhost:5000/lessons';

export const getAll = () => {
    return fetch(url)
        .then(res => res.json())
        .then((data) => {
            console.log('JSON response:', data); 
            return data;
        })
        //.then(lesson => lesson.map(x => ({...x, likes: Number(x.likes)})))
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

/*
export const getOne = (petId) => {
    return fetch(`${url}/${petId}`)
        .then(res => res.json())
        .catch(error => console.log(error));
};

export const create = (petName, description, imageURL, category) => {
    let pet = {
        name: petName,
        description,
        imageURL,
        category,
        likes: 0,
    };
    
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pet)
    });
};

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