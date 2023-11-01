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
import convertFromHTML from 'html-to-draftjs';
import { ContentState, EditorState } from 'draft-js';
import DeleteConfirmationDialog from './DeleteConfirmationDialog/DeleteConfirmationDialog';
import {deleteLesson} from '../../services/LessonServices';

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

const convertHTMLToEditorContent = (html) => {
  const blocksFromHTML = convertFromHTML(html);
  const contentBlocks = blocksFromHTML.contentBlocks;
  const contentState = ContentState.createFromBlockArray(contentBlocks);

  return EditorState.createWithContent(contentState);
}

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      category: 'lessons',
      editorState: createEditorStateWithText(text),
      lessons: [],
      selectedLessonId: null,
      showDeleteConfirmation: false,
      isDeleteConfirmed: false,
    };
  }

  componentDidMount() {
    getMine()
      .then(res => {
        if (res && Array.isArray(res)) {
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

  handleLessonClick = (index, id) => {
    const selectedLesson = this.state.lessons[index];
    const editorState = convertHTMLToEditorContent(selectedLesson.content);
    console.log(id)
    this.setState({
        selectedLessonId: id,
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

  handleDelete = (event) => {
    event.preventDefault();
    this.setState({ showDeleteConfirmation: true });
  };
  handleDeleteConfirmation = (confirmed) => {
    this.setState({ showDeleteConfirmation: false, isDeleteConfirmed: confirmed }, () => {
      if (confirmed) {
        deleteLesson(this.state.selectedLessonId)
      }
    });
  };


  renderLessonList = (lessons, selectedLessonId) => {
    return (
      <div className="edit-lesson-list">
          {lessons.lessons.map((lesson,index) => (
              <div 
                  key={lesson._id}
                  className={`edit-lesson-title ${selectedLessonId === lesson._id ? 'selected' : ''}`}
                  onClick={() => this.handleLessonClick(index, lesson._id)}
              >
                  {lessons.lessons[index].title}
              </div>
          ))}
      </div>
    );
  }

  render() {
    const { lessons, selectedLessonId, editorState } = this.state;
    return (
      <div>
        {lessons.length === 0 ? <p>Loading</p> : this.renderLessonList({
            lessons,
            selectedLessonId,
        })}      
      <div className='add-container edit-container'>
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
                editorState={editorState}
                onChange={this.onChange}
                modifier={imagePlugin.addImage}
              />
              <Toolbar />
            </div>
            <div className={editorStyles.editor} onClick={this.focus}>
              <Editor
                editorState={editorState}
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
            >Edit
            </button>
            <button
              type='submit'
              className='red-button space-left'
              onClick={this.handleDelete}
            >Delete
            </button>
          </div>
        </form>
      </div>
      {this.state.showDeleteConfirmation && (
          <DeleteConfirmationDialog
            onConfirm={this.handleDeleteConfirmation}
          />
        )}
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