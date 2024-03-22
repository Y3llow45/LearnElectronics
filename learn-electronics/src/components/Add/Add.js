import React, { Component } from 'react';
import {add} from '../../services/LessonServices'
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import {stateToHTML} from 'draft-js-export-html';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import editorStyles from './CustomImageEditor/editorStyles.module.css';
import buttonStyles from './buttonStyles.module.css';
import {handleInputChangeComponent} from '../Form/handleInputChange/handleInputChange';
import toolbarStyles from './toolbarStyles.module.css';
import createImagePlugin from '@draft-js-plugins/image';
import ImageAdd from './CustomImageEditor/ImageAdd/ImageAdd';
import './Add.css';
import { displayError } from '../Notify/Notify';
import { checkDuplicate } from '../../services/LessonServices';

const imagePlugin = createImagePlugin();

const toolbarPlugin = createToolbarPlugin({
  theme: { buttonStyles, toolbarStyles },
});
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin, imagePlugin];

const text = 'Enter lesson content';
const addErrors = {
  errorEmpty: 'Provide title and content',
  errorTitleExist: 'Lesson with such title already exist',
  contentLength: 'Content is too short or too long',
  title: 'Invalid Title. Use only A-z, 0-9 and ()-/',
  script: 'XSS is not allowed'
}
const titleRegex = /^[A-Za-z0-9]{1,40}$/;

class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      category: 'lessons',
      editorState: createEditorStateWithText(text),
    };
  }

  componentDidMount() {
    document.getElementById("lesson-title").addEventListener("blur", this.checkLessonTitle);
  }
  
  componentWillUnmount() {
    document.getElementById("lesson-title").removeEventListener("blur", this.checkLessonTitle);
  }

  checkLessonTitle = async () => {
    await checkDuplicate('Title',this.state.title)
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
    //console.log(stateToHTML(this.state.editorState.getCurrentContent()));
  };

  focus = () => {
    this.editor.focus();
  };

  handleInputChange = (event) => {
    handleInputChangeComponent(event, this.setState.bind(this));
  };

  handleAdd  = async(event) => {
    event.preventDefault();
    const contentState = this.state.editorState.getCurrentContent();
    const htmlContent = stateToHTML(contentState);
    if(this.state.title === '' || htmlContent === ''){
      displayError(addErrors.errorEmpty);
    }else if(!titleRegex.test(this.state.title)){
      displayError(addErrors.title);
    }else if(htmlContent.length < 120 || htmlContent.length > 100000) {
      displayError(addErrors.contentLength);
    }else if(htmlContent.includes("<script") || htmlContent.includes("<?")) {
      displayError(addErrors.script);
    }
    else {
      await checkDuplicate('Title',this.state.title)
        .then((data) => {
          if(!data) {
            add(this.state.title, htmlContent, this.state.category)
            this.props.history.push('/lessons/0')
          }
        })
    }
  };

  render() {
    return (
      <div className='add-container'>
        <form>
          <div className='add-first'>
            <div className='add-first-inputs'>
              <input
                type='title'
                name='title'
                placeholder='title'
                value={this.state.title}
                onChange={this.handleInputChange}
                id="lesson-title"
                className='input-form add-input-form'
                required
              />
              <select
                required
                name='category'
                className='input-form add-select'
                value={this.state.category}
                onChange={this.handleInputChange}
              >
                <option value='lessons'>Lessons</option>
                <option value='electric-components'>Electric Components</option>
                <option value='microcontrollers'>Microcontrollers</option>
              </select>
            </div>
            <div className='bunchOfbuttons' style={{ display: 'inline-flex', width: '60%', justifyContent: 'center', marginBottom: '30px' }}>
              <ImageAdd
                editorState={this.state.editorState}
                onChange={this.onChange}
                modifier={imagePlugin.addImage}
              />
              <Toolbar />
            </div>
            <div className={editorStyles.editor} onClick={this.focus}>
              <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
                plugins={plugins}
                ref={(element) => {
                  this.editor = element;
                }}
              />
            </div>
            <button 
              type='submit'
              className='form-submit add-form-submit'
              onClick={this.handleAdd}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Add;

/*<textarea
              name='content'
              placeholder='Content'
              value={this.state.content}
              onChange={this.handleInputChange}
              className='input-form add-input-form-textarea'
              id='txt-are-content'
              required
            />*/


/*import {add} from '../../services/LessonServices'
import { Component } from 'react';
import './Add.css';
import {handleInputChangeComponent} from '../Form/handleInputChange/handleInputChange';
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import {stateToHTML} from 'draft-js-export-html';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import editorStyles from './editorStyles.module.css';
import buttonStyles from './buttonStyles.module.css';
import toolbarStyles from './toolbarStyles.module.css';
import CustomImageEditor from './CustomImageEditor/CustomImageEditor';

const toolbarPlugin = createToolbarPlugin({
    theme: { buttonStyles, toolbarStyles },
  });
  const { Toolbar } = toolbarPlugin;
  const plugins = [toolbarPlugin];
  const text =
    'In this editor a toolbar with a lot more options shows up once you select part of the text …';

class Add extends Component{
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',
            category: 'lessons',
            editorState: createEditorStateWithText(text)
        };
    }
    
    onChange = (editorState) => {
        this.setState({
          editorState,
        });
    };
    
      focus = () => {
        this.editor.focus();
      };
    
    componentDidMount() {
        this.setState({
          editorState: createEditorStateWithText(text),
        });
    }


    handleInputChange = (event) => {
        handleInputChangeComponent(event, this.setState.bind(this));
    }

    handlePreviewChange = (e) => {
        e.preventDefault();
        const contentState = this.state.editorState.getCurrentContent();
        const htmlContent = stateToHTML(contentState);
        console.log(htmlContent)
        this.setState({ content: htmlContent });
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
                    <div className='add-first'>
                        <input type="title"
                          name="title"
                          placeholder="title"
                          value={this.state.title}
                          onChange={this.handleInputChange}
                          className='input-form add-input-form'
                          required>
                        </input>
                        <select required name="category" className="input-form add-select" value={this.state.category} onChange={this.handleInputChange}>
                          <option value="lessons">Lessons</option>
                          <option value="electric-components">Electric Components</option>
                          <option value="microcontrollers">Microcontrollers</option>
                        </select>
                        <div className='add-first'>
                          <CustomImageEditor />
                        </div>
                        <div className={editorStyles.editor} onClick={this.focus}>
                            <Toolbar />
                            <Editor
                              editorState={this.state.editorState}
                              onChange={this.onChange}
                              plugins={plugins}
                              ref={(element) => {
                                  this.editor = element;
                              }}
                            />
                        </div>
                        <button onClick={this.handlePreviewChange} className='form-submit add-form-submit'>Preview</button>
                        <button type="submit" className='form-submit add-form-submit' onClick={this.handleAdd}>Add</button>
                    </div>

                    <div className='add-second'>
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
                    </div>
                </form>
            </div>
        );
    }
}

export default Add;*/

/*<div className='add-container'>
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
            </div>*/



/*import React, { Component } from 'react';
import './Add.css';
import { handleInputChangeComponent } from '../Form/handleInputChange/handleInputChange';
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import { stateToHTML } from 'draft-js-export-html';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import editorStyles from './editorStyles.module.css';
import buttonStyles from './buttonStyles.module.css';
import toolbarStyles from './toolbarStyles.module.css';
import {add} from '../../services/LessonServices'
import CustomImageEditor from './CustomImageEditor/CustomImageEditor'; // Import the custom image editor component

const toolbarPlugin = createToolbarPlugin({
  theme: { buttonStyles, toolbarStyles },
});
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin];
const text =
  'In this editor, a toolbar with a lot more options shows up once you select part of the text …';

class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      category: 'lessons',
      editorState: createEditorStateWithText(text),
    };
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.editor.focus();
  };

  componentDidMount() {
    this.setState({
      editorState: createEditorStateWithText(text),
    });
  }

  handleInputChange = (event) => {
    handleInputChangeComponent(event, this.setState.bind(this));
  };

  handlePreviewChange = (e) => {
    e.preventDefault();
    const contentState = this.state.editorState.getCurrentContent();
    const htmlContent = stateToHTML(contentState);
    console.log(htmlContent);
    this.setState({ content: htmlContent });
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
  };

  handleAdd = (event) => {
    event.preventDefault();
    console.log(this.state.title, this.state.content, this.state.category);
    add(this.state.title, this.state.content, this.state.category)
      .then((res) => {
        if (res.status === 201) {
          console.log('Created!');
        } else {
          console.error(`Error: ${res.statusText}`);
        }
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  };

  render() {
    return (
      <div className='add-container'>
        <form>
          <div className='add-first'>
            <input
              type='title'
              name='title'
              placeholder='title'
              value={this.state.title}
              onChange={this.handleInputChange}
              className='input-form add-input-form'
              required
            />
            <select
              required
              name='category'
              className='input-form add-select'
              value={this.state.category}
              onChange={this.handleInputChange}
            >
              <option value='lessons'>Lessons</option>
              <option value='electric-components'>Electric Components</option>
              <option value='microcontrollers'>Microcontrollers</option>
            </select>
            <CustomImageEditor editorState={this.state.editorState} onChange={this.onChange} />
            <div className={editorStyles.editor} onClick={this.focus}>
              <Toolbar />
              <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
                plugins={plugins}
                ref={(element) => {
                  this.editor = element;
                }}
              />
            </div>
            <button
              onClick={this.handlePreviewChange}
              className='form-submit add-form-submit'
            >
              Preview
            </button>
            <button
              type='submit'
              className='form-submit add-form-submit'
              onClick={this.handleAdd}
            >
              Add
            </button>
          </div>

          <div className='add-second'>
            <textarea
              name='content'
              placeholder='Content'
              value={this.state.content}
              onChange={this.handleInputChange}
              className='input-form add-input-form-textarea'
              id='txt-are-content'
              required
            />
            <div
              id='add-result-container'
              dangerouslySetInnerHTML={{ __html: this.state.content }}
              style={{ display: 'none' }}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Add;*/