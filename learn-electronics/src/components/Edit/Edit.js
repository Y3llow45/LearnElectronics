import { Component } from 'react';
import {edit, getMine} from '../../services/LessonServices'
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import {stateToHTML} from 'draft-js-export-html';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import editorStyles from '../Add/editorStyles.module.css';
import buttonStyles from '../Add/buttonStyles.module.css';
import {handleInputChangeComponent} from '../Form/handleInputChange/handleInputChange';
import toolbarStyles from '../Add/toolbarStyles.module.css';
import createImagePlugin from '@draft-js-plugins/image';
import ImageAdd from '../Add/CustomImageEditor/ImageAdd/ImageAdd';
import './Edit.css';
import { displayError } from '../Notify/Notify';

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

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      category: 'lessons',
      editorState: createEditorStateWithText(text),
      lessons: [],
      selectedLessonId: null
    };
  }

  componentDidMount() {
    getMine()
      .then(res => {
        if (res && Array.isArray(res)) {
        /*const lessonsObject = {};
        res.forEach(lesson => {
            lessonsObject[lesson._id] = lesson;
            });
            this.setState({ lessons: lessonsObject });
            console.log(this.state.lessons)*/
          this.setState({lessons: res})
          console.log(this.state.lessons)
        } else {
          displayError('Server error');
        }
      })
      .catch(displayError('Server error'));
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

  handleLessonClick = (index, _id) => {
    const selectedLesson = this.state.lessons[index];
    const editorState = createEditorStateWithText(selectedLesson.content);
    this.setState({
        selectedLessonId: _id,
        title: selectedLesson.title,
        category: selectedLesson.category,
        editorState: editorState,
    });
  };

  handleEdit = (event) => {
    event.preventDefault();
    const contentState = this.state.editorState.getCurrentContent();
    const htmlContent = stateToHTML(contentState);
    if(this.state.title === '' || htmlContent === ''){
      displayError(addErrors.errorEmpty);
    }else if(htmlContent.length < 120 || htmlContent.length > 5000) {
      displayError(addErrors.contentLength);
    }
    else {

      edit(this.state.selectedLessonId, this.state.title, htmlContent, this.state.category)
    }
  };

  renderLessonList = (lessons, selectedLessonId) => {
    return (
      <div className="lesson-list">
          {lessons.lessons.map((_id,index) => (
              <div 
                  key={_id}
                  className={`lesson-title ${selectedLessonId === _id ? 'selected' : ''}`}
                  onClick={() => this.handleLessonClick(index, _id)}
              >
                  {lessons.lessons[index].title}
              </div>
          ))}
      </div>
    );
  }

  render() {
    const { lessons, selectedLessonId } = this.state;
    return (
      <div>
        {lessons.length === 0 ? <p>Loading</p> : this.renderLessonList({
            lessons,
            selectedLessonId,
        })}      
      <div className='add-container'>
        <form>
          <div className='add-first edit-first'>
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
              onClick={this.handleEdit}
            >
              Edit
            </button>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

export default Edit;


/*{Object.keys(lessons).map(lessonId => (
              <div 
                  key={lessonId}
                  className={`lesson-title ${selectedLessonId === lessonId ? 'selected' : ''}`}
                  onClick={() => handleLessonClick(lessonId)}
              >
                  {lessons[lessonId].title}
              </div>
          ))}*/