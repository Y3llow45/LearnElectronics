import React, { Component } from "react";
import './Lessons.css';
import * as LessonService from '../../services/LessonServices';
import SearchBar from './SearchBar/SearchBar';
import renderLessonList from './renderLessonList/renderLessonList';
import { displayError } from '../Notify/Notify';
import { NavLink } from 'react-router-dom';

class Lessons extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lessons: {},
            selectedLessonId: null
        };
    }

    componentDidMount() {
        const { page } = this.props.match.params;
        this.loadLessons(page);
      }
    
      componentDidUpdate(prevProps) {
        if (this.props.match.params.page !== prevProps.match.params.page) {
          const { page } = this.props.match.params;
          this.loadLessons(page);
        }
      }
    
      loadLessons(page) {
        LessonService.getAll(page)
          .then((res) => {
            if (res && Array.isArray(res.lessons)) {
              this.setState({
                lessons: res.lessons,
                totalPages: res.totalPages,
              });
            } else {
              console.log('operation failed')
            }
          })
          .catch((error) => {
            console.log(error)
          });
      }

    handleLessonClick = (lessonId) => {
        this.setState({ selectedLessonId: lessonId });
    };

    

    renderLessonContent() {
        const { lessons, selectedLessonId } = this.state;
        const selectedLesson = lessons[selectedLessonId];

        return (
            <div className="lesson-content">
                {selectedLesson && (
                    <div>
                        <p className="content-lesson-title">{selectedLesson.title}</p>
                        <div>
                            <p  className="lesson-text" dangerouslySetInnerHTML={{ __html: selectedLesson.content }}></p>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    handleSearchResults = (searchResults) => {
        this.setState({ lessons: searchResults})
    };
    renderPagination() {
        const { page, totalPages } = this.state;
        const currentPage = parseInt(page, 10);
    
        return (
          <div className="lesson-pagination">
            <NavLink to={`/lessons/${currentPage - 1}`} disabled={currentPage === 0}>
              Previous
            </NavLink>
            <span>Page {currentPage + 1}</span>
            <NavLink to={`/lessons/${currentPage + 1}`} disabled={currentPage === totalPages}>
              Next
            </NavLink>
          </div>
        );
      }

    render() {
        const { lessons, selectedLessonId } = this.state;
        
        return (
            <div className="lessons-container">
                {renderLessonList(lessons, selectedLessonId, this.handleLessonClick)}
                {this.renderPagination()}
            </div>
        );
    }
}

export default Lessons;


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