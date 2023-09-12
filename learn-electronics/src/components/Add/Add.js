import {add} from '../../services/LessonServices'
import React, { Component } from 'react';
import './Add.css';
import {handleInputChangeComponent} from '../Form/handleInputChange/handleInputChange';

class Add extends Component{
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',
            category: 'lessons'
        };
    }
    handleInputChange = (event) => {
        handleInputChangeComponent(event, this.setState.bind(this));
    }

    handlePreviewChange = (e) => {
        e.preventDefault();
        let result = document.getElementById('add-result-container');
        let content = document.getElementById('txt-are-content');
        if (result.style.display === 'none' || result.style.display === '') {
            result.style.display = 'block';
            result.style.height = '517px';
            content.style.display = 'none';
        } else {
            result.style.display = 'none';
            content.style.display = 'block';
        }
    }

    handleAdd = (event) => {
        event.preventDefault();
        console.log(this.state.title, this.state.content, this.state.category);
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
            <div className='add-container'>
                <form>
                    <div className='add-input-container'>
                        <input type="title"
                            name="title"
                            placeholder="title"
                            value={this.state.title}
                            onChange={this.handleInputChange}
                            className='input-form add-input-form'
                            required>
                        </input>
                        <button onClick={this.handlePreviewChange} className='form-submit add-form-submit'>Preview</button>
                        <select required name="category" className="input-form add-select" value={this.state.category} onChange={this.handleInputChange}>
                            <option value="lessons">Lessons</option>
                            <option value="electric-components">Electric Components</option>
                            <option value="microcontrollers">Microcontrollers</option>
                        </select>
                        <button type="submit" className='form-submit add-form-submit' onClick={this.handleAdd}>Add</button>
                    </div>
                    <textarea
                        name="content"
                        placeholder="Content"
                        value={this.state.content}
                        onChange={this.handleInputChange}
                        className="input-form add-input-form-textarea"
                        id="txt-are-content"
                        
                        required
                    />
                    <div id='add-result-container' dangerouslySetInnerHTML={{ __html: this.state.content }} style={{ display: 'none' }}/>    
                </form>
            </div>
        );
    }
}

export default Add;
