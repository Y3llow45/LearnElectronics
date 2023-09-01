import {add} from '../../services/LessonServices'
import React, { Component } from 'react';
import {handleInputChangeComponent} from '../Form/handleInputChange/handleInputChange';

class Add extends Component{
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',
            category: ''
        };
    }
    handleInputChange = (event) => {
        handleInputChangeComponent(event, this.setState.bind(this));
    }

    handleAdd = (event) => {
        event.preventDefault();
        add(this.state.title, this.state.content, this.state.category)
            .then(res => {
                if(res.status === 201){
                    console.log('Created!');
                }else {
                    console.error(`Error: ${res.statusText}`)
                }
            })
            .catch(err => {
                console.error(`Error: ${err}`)
            })
    };


    render(){
        return (
            <div>
                <div className='add-container'>
                    <form className="" onSubmit={this.handleAdd}>
                        <input type="title"
                            name="title"
                            placeholder="title"
                            value={this.state.title}
                            onChange={this.handleInputChange}
                            className='input-form'
                            required></input>
                        <input type="content"
                            name="content"
                            placeholder="content"
                            value={this.state.content}
                            onChange={this.handleInputChange}
                            className='input-form'
                            required></input>
                        <input type="category"
                            name="category"
                            placeholder="category"
                            value={this.state.category}
                            onChange={this.handleInputChange}
                            className='input-form'
                            required>
                        </input>
                        <button type="submit" className='form-submit'>Add</button>
                    </form>
                </div>
                <div className='add-result-container'>
                    <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
                </div>
            </div>
        );
    }
}

export default Add;
