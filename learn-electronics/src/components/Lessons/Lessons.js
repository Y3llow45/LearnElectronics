import React, { Component } from "react";
import './Lessons.css';
import * as LessonService from '../../services/LessonServices';
import SearchBar from './SearchBar/SearchBar';
import { renderLessonList } from "./RenderLessonList/RenderLessonList";
import {displayError} from '../Notify/Notify' 
import { renderPagination } from "./RenderPagination/RenderPagination";

class Lessons extends Component {
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
        <SearchBar onSearchResults={this.handleSearchResults}/>
          <div className="lessons-container">
            {lessons.length === 0 ? <p style={{"textAlign": "center"}}>No results</p> : renderLessonList(lessons, selectedLessonId, this.handleLessonClick)}
            {renderPagination(this.state.totalPages, this.props.match.params.pageNum)}
          </div>
        </div>
        );
    }
}

export default Lessons;

/*{renderLessonList(lessons, selectedLessonId, this.handleLessonClick)}*/

/*componentDidMount() {
        const { pageNum } = this.props.match.params;
        LessonService.getAll(pageNum)
            .then(res => {
                if (res && Array.isArray(res)) {
                    const lessonsObject = {};
                    res.forEach(lesson => {
                        lessonsObject[lesson.title] = lesson;
                    });
                    this.setState({ lessons: lessonsObject });
                } else {
                    displayError("Server error")
                }
            })
            .catch(displayError("Server error"));
    } */

/*<div className="lessons-container">
                {renderLessonList({
                    lessons,
                    selectedLessonId,
                    handleLessonClick: this.handleLessonClick,
                })}
                <SearchBar onSearchResults={this.handleSearchResults} />
                {this.renderLessonContent()}
            </div>*/