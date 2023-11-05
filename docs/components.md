## Add lessons component
This component creates lessons. Users need to have account and be logged in.

User can choose lesson title and category
```javascript
<input type='title' name='title' placeholder='title' value={this.state.title} onChange={this.handleInputChange} className='input-form add-input-form' required/>
<select required name='category' className='input-form add-select' value={this.state.category} onChange={this.handleInputChange}>
    <option value='lessons'>Lessons</option>
    <option value='electric-components'>Electric Components</option>
    <option value='microcontrollers'>Microcontrollers</option>
</select>
```

Can write lesson's content
```javascript
<Editor editorState={this.state.editorState} onChange={this.onChange} plugins={plugins} ref={(element) => { this.editor = element;}}/>
```

Can style lesson's content and add images
```javascript
<ImageAdd editorState={this.state.editorState} onChange={this.onChange} modifier={imagePlugin.addImage}/>
<Toolbar />
```

Add lesson with click of a button
```javascript
<button  type='submit' className='form-submit add-form-submit' onClick={this.handleAdd}>Add</button>
```

Client side validations are made and then the lesson is send to LessonServices component which makes request to the server
```javascript
handleAdd = (event) => {
    event.preventDefault();
    const contentState = this.state.editorState.getCurrentContent();
    const htmlContent = stateToHTML(contentState);
    if(this.state.title === '' || htmlContent === ''){
      displayError(addErrors.errorEmpty);
    }else if(this.state.title.length > 40){
      displayError(addErrors.titleLength);
    }else if(htmlContent.length < 120 || htmlContent.length > 10000) {
      displayError(addErrors.contentLength);
    } 
    else {
      add(this.state.title, htmlContent, this.state.category)
    }
  };
```

## Edit lessons component