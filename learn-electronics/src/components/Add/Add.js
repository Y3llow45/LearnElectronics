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
            category: ''
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
                <div className='add-input-container'>
                    <form>
                        <div className='flex'>
                        <input type="title"
                            name="title"
                            placeholder="title"
                            value={this.state.title}
                            onChange={this.handleInputChange}
                            className='input-form'
                            required>
                        </input>
                        <select required name="category" className="input-form" value={this.state.category} onChange={this.handleInputChange}>
                            <option value="lessons">Lessons</option>
                            <option value="electric-components">Electric Components</option>
                            <option value="microcontrollers">Microcontrollers</option>
                        </select>
                        </div>
                        <textarea
                            name="content"
                            placeholder="Content"
                            value={this.state.content}
                            onChange={this.handleInputChange}
                            className="input-form"
                            id="txt-are-content"
                            style={{ width: '1200px', height: '500px' }}
                            required
                        />
                        <div id='add-result-container' dangerouslySetInnerHTML={{ __html: this.state.content }} style={{ display: 'none' }}/>    
                        <div className='flex'>
                            <button onClick={this.handlePreviewChange} className='form-submit'>Preview</button>
                            <button type="submit" className='form-submit form-submit-space' onClick={this.handleAdd}>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Add;
