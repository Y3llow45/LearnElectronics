import { Component } from 'react';
import {edit} from '../../services/LessonServices'
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import {stateToHTML} from 'draft-js-export-html';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
//import editorStyles from './CustomImageEditor/editorStyles.module.css';
import editorStyles from '../Add/editorStyles.module.css';
import buttonStyles from '../Add/buttonStyles.module.css';
import {handleInputChangeComponent} from '../Form/handleInputChange/handleInputChange';
import toolbarStyles from '../Add/toolbarStyles.module.css';
import createImagePlugin from '@draft-js-plugins/image';
import ImageAdd from '../Add/CustomImageEditor/ImageAdd/ImageAdd';
import './Edit.css';
import { displayLoginError } from '../Notify/Notify';

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
}

class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
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

  handleInputChange = (event) => {
    handleInputChangeComponent(event, this.setState.bind(this));
  };

  handleAdd = (event) => {
    event.preventDefault();
    const contentState = this.state.editorState.getCurrentContent();
    const htmlContent = stateToHTML(contentState);
    if(this.state.title === '' || htmlContent === ''){
      console.log(this.state)
      displayLoginError(addErrors.errorEmpty);
    }else if(htmlContent.length < 120 || htmlContent.length > 5000) {
      displayLoginError(addErrors.contentLength);
    }
    else {
      edit(this.state.title, htmlContent, this.state.category)
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