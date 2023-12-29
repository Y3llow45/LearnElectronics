import React, { Component } from "react";
import './Lessons.css';
import * as LessonService from '../../services/LessonServices';
import SearchBar from './SearchBar/SearchBar';
import { NavLink } from 'react-router-dom';
import {displayError} from '../Notify/Notify' 
import {renderLessonList} from './LessonList/LessonList';

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
      <div>
      <SearchBar onSearchResults={this.handleSearchResults}/>
        <div className="lessons-container">
          {lessons.length === 0 ? <p style={{"textAlign": "center"}}>No results</p> : renderLessonList(lessons, selectedLessonId, this.handleLessonClick)}
          {this.renderPagination(2)}
        </div>
      </div>
    );
  }
}

export default Lessons;