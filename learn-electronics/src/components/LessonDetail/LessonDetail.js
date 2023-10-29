import React, { Component } from "react";
import {getLessonDetail} from '../../services/LessonServices';
import './LessonDetail.css'

class LessonDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lesson: null
    };
  }

  componentDidMount() {
    const { title } = this.props.match.params;
    getLessonDetail(title)
      .then(lesson => {
        this.setState({ lesson });
        console.log(this.state.lesson)
      })
      .catch(error => {
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
      </div>
    );
  }
}

export default LessonDetail;
