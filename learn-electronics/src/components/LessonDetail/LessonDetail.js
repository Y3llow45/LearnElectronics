import { Component } from "react";
import {getLessonDetail, unLike} from '../../services/LessonServices';
import {getRole, deleteLesson, like} from '../../services/LessonServices';
import DeleteConfirmationDialog from "../Edit/DeleteConfirmationDialog/DeleteConfirmationDialog";
import './LessonDetail.css'
import { displayInfo } from "../Notify/Notify";

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
  redirectLessons = () => {
    this.props.history.push('');
  }
  
  handleDelete = (event) => {
    event.preventDefault();
    this.setState({ showDeleteConfirmation: true });
  };

  handleLike = (event) => {
    event.preventDefault();
    if(localStorage.getItem('token') === null) {
      displayInfo('You need to login first');
      return
    }
    const likedData = localStorage.getItem('liked');
    let likedIds = [];
    try{
      if(!likedData.includes("[")) {
        likedIds = likedData ? likedData.split(",").map(item => item.trim()) : [];
      }else {
        likedIds = likedData ? JSON.parse(likedData) : [];
      }
      if (!likedIds.includes(this.state.lesson[0]._id)) {
        likedIds.push(this.state.lesson[0]._id);
        localStorage.setItem('liked', JSON.stringify(likedIds));
        try {
          like(this.state.lesson[0]._id)
            .catch((error) => {
              console.log(error);
            });
        } catch(error) {
          console.log(error);
        }
      }else {
        const updatedLikedIds = likedIds.filter(existingId => existingId !== this.state.lesson[0]._id);
        localStorage.setItem('liked', JSON.stringify(updatedLikedIds));
        try {
          unLike(this.state.lesson[0]._id)
            .catch((error) => {
              console.log(error);
            });
        } catch(error) {
          console.log(error);
        }
      }
      }catch(err) {
        console.log(err);
      }
  }
  
  handleDeleteConfirmation = (confirmed) => {
    this.setState({ showDeleteConfirmation: false, isDeleteConfirmed: confirmed }, () => {
      if (confirmed) {
        //console.log(this.state.lesson[0]._id);
        deleteLesson(this.state.lesson[0]._id)
        this.redirectLessons()
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
    try {
      getRole()
        .then((data) => {
          if (data) {
            this.setState({ userRole: data.role });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch {
      //console.log(error);
      this.setState({ userRole: 'user' });
    }
  }

  render() {
    const { lesson } = this.state;
    return (
      <div className="lesson-detail">
        {lesson && lesson[0] ? (
          <div className="lesson-detail-center">
            <h1>{lesson[0].title}</h1> 
            <div dangerouslySetInnerHTML={{ __html: lesson[0].content }}></div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        {<button
            type='submit'
            className='red-button space-left green-button'
            style={{'marginLeft':'6.5%'}}
            onClick={this.handleLike}
            >Like
          </button>}
        {(lesson && lesson[0].user === localStorage.getItem('username')) || this.state.userRole === 'moderator' || this.state.userRole === 'admin' ? (
          <button
            type='submit'
            className='red-button space-left'
            style={{'marginLeft':'6.5%'}}
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
