import { Component } from "react";
import {getLessonDetail} from '../../services/LessonServices';
import {getRole, deleteLesson} from '../../services/LessonServices';
import DeleteConfirmationDialog from "../Edit/DeleteConfirmationDialog/DeleteConfirmationDialog";
import './LessonDetail.css'

class LessonDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lesson: null,
      userRole: 'user',
      showDeleteConfirmation: false,
      isDeleteConfirmed: false,
    };
  }
  handleDelete = (event) => {
    event.preventDefault();
    this.setState({ showDeleteConfirmation: true });
  };
  
  handleDeleteConfirmation = (confirmed) => {
    this.setState({ showDeleteConfirmation: false, isDeleteConfirmed: confirmed }, () => {
      if (confirmed) {
        //console.log(this.state.lesson[0]._id);
        deleteLesson(this.state.lesson[0]._id)
      }
    });
  };

  componentDidMount() {
    const { title } = this.props.match.params;
    getLessonDetail(title)
      .then(lesson => {
        this.setState({ lesson });
      })
      .catch(error => {
        console.log(error);
    });
    getRole()
      .then((data) => {
        this.setState({ userRole: data.role });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { lesson } = this.state;
    return (
      <div className="lesson-detail">
        {lesson ? (
          <div className="lesson-detail-center">
            <h1>{lesson[0].title}</h1> 
            <div dangerouslySetInnerHTML={{ __html: lesson[0].content }}></div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        {this.state.userRole === 'moderator' || this.state.userRole === 'admin' ? (
          <button
            type='submit'
            className='red-button space-left'
            onClick={this.handleDelete}
            >Delete
          </button>
        ) : null}
        {this.state.showDeleteConfirmation && (
          <DeleteConfirmationDialog
            onConfirm={this.handleDeleteConfirmation}
          />
        )}
      </div>
    );
  }
}

export default LessonDetail;
