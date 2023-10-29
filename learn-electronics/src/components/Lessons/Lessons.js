import React, { Component } from "react";
import './Lessons.css';
import * as LessonService from '../../services/LessonServices';
import SearchBar from './SearchBar/SearchBar';
import { displayError } from '../Notify/Notify';
import { NavLink } from 'react-router-dom';

class Lessons extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lessons: [],
            selectedLessonId: null
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
          if (res && Array.isArray(res)) {
            this.setState({
              lessons: res,
            });
          } else {
            console.log('Operation failed');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    handleLessonClick = (lessonId) => {
        this.setState({ selectedLessonId: lessonId });
    };

    renderLessonList(lessons, selectedLessonId, handleLessonClick) {
      return (
        <div className="my-list">
            {lessons.map((lesson,index) => (
                <div className="center-div">
                <span className="lesson-number lesson-title">{index + 1}</span>
                <NavLink
                    key={lesson._id}
                    to={`/lesson/${lesson.title}`}
                    className={`lesson-title ${selectedLessonId === lesson._id ? 'selected' : ''}`}
                    onClick={() => handleLessonClick(lesson._id)}
                >
                    {lesson.title}
                </NavLink>
                <span className="lesson-author lesson-title">{lesson.user}</span>
                <span className="lesson-likes lesson-title">{lesson.likes}</span>
                </div>
            ))}
        </div>
      );
    }

    renderPagination(totalPages) {
      const currentPage = parseInt(this.props.match.params.pageNum, 10);
      const previousPage = currentPage - 1;
      const nextPage = currentPage + 1;
  
      return (
        <div className="lesson-pagination">
          {currentPage > 0 ? (
            <NavLink className={'special-navlink'} to={`/lessons/${previousPage}`}>
            Previous
          </NavLink>    
          ) : <span className="grey-span">Previous</span>}
          <span className="current-page">{currentPage + 1}</span>
          {currentPage < totalPages - 1 ? (
            <NavLink className={'special-navlink'} to={`/lessons/${nextPage}`}>
              Next
            </NavLink>
          ) : <span className="grey-span">Next</span>}
        </div>
      );
  }

    render() {
        const { lessons, selectedLessonId } = this.state;
        return (
          <fragment>
          <SearchBar />
            <div className="lessons-container">
                {lessons.length === 0 ? <p>Loading</p> : this.renderLessonList(lessons, selectedLessonId, this.handleLessonClick)}
                {this.renderPagination(2)}
            </div>
          </fragment>
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