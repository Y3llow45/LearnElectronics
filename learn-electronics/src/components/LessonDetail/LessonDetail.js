import React, { Component } from "react";
import {getLessonDetail} from '../../services/LessonServices';

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
          <div>
            <h1>{lesson.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: lesson.content }}></div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default LessonDetail;
