import React, { Component } from "react";
import './Blog.css';
import * as LessonService from '../../services/LessonServices';
import SearchBar from '../Lessons/SearchBar/SearchBar';
import { renderLessonList} from '../Lessons/RenderLessonList/RenderLessonList';
import {displayError} from '../Notify/Notify' 
import { renderPagination} from '../Lessons/RenderPagination/RenderPagination';

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: [],
      selectedLessonId: null,
      totalPages: 1
    };
  }

  componentDidMount() {
      const { pageNum } = this.props.match.params;
      this.loadLessons(pageNum);
  }
  
  componentDidUpdate(prevProps) {
      if (this.props.match.params.pageNum !== prevProps.match.params.pageNum) {
        const { pageNum } = this.props.match.params;
        this.loadLessons(pageNum);
      }
  }

  loadLessons(page) {
    LessonService.getAll(page)
      .then((res) => {
        if (res.lessons && Array.isArray(res.lessons)) {
          this.setState({
            lessons: res.lessons,
            totalPages: res.totalPages
          });
        } else {
          displayError('No response from server')
        }
      })
      .catch((error) => console.log(error));
  }

  handleLessonClick = (lessonId) => {
    this.setState({ selectedLessonId: lessonId });
  };
  handleSearchResults = (searchResults) => {
    this.setState({ lessons: searchResults });
  };
  
  render() {
    const { lessons, selectedLessonId } = this.state;
    return (
      <div>
        <SearchBar onSearchResults={this.handleSearchResults} options={
            <div><option value="all">All Categories</option>
            <option value="lessons">Lessons</option>
            <option value="electric-components">Electric Components</option>
            <option value="microcontrollers">Microcontrollers</option>
            <option value="liked">Liked</option></div>
        }/>
        <div className="lessons-container">
          {lessons.length === 0 ? <p style={{"textAlign": "center"}}>No results</p> : renderLessonList(lessons, selectedLessonId, this.handleLessonClick)}
          {renderPagination(this.state.totalPages, this.props.match.params.pageNum)}
        </div>
      </div>
      );
  }
}

export default Blog;
