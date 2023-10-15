import React, { Component } from "react";
import './Lessons.css';
import * as LessonService from '../../services/LessonServices';
import SearchBar from './SearchBar/SearchBar';
import renderLessonList from './renderLessonList/renderLessonList';

class Lessons extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lessons: {},
            selectedLessonId: null
        };
    }

    componentDidMount() {
        LessonService.getAll()
            .then(res => {
                if (res && Array.isArray(res)) {
                    const lessonsObject = {};
                    res.forEach(lesson => {
                        lessonsObject[lesson.title] = lesson;
                    });
                    this.setState({ lessons: lessonsObject });
                } else {
                    console.error('Invalid data format:', res);
                }
            })
            .catch(error => {
                console.error('Error fetching lessons:', error);
            });
    }

    handleLessonClick = (lessonId) => {
        this.setState({ selectedLessonId: lessonId });
    };


    renderLessonContent() {
        const { lessons, selectedLessonId } = this.state;
        //const selectedLesson = lessons.find(x => x.id === selectedLessonId);
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
        const uniqueSearchResults = [...new Map(searchResults.map((lesson) => [lesson.id, lesson])).values()];
        this.setState({ lessons: uniqueSearchResults });
    };

    render() {
        const { lessons, selectedLessonId } = this.state;
        return (
            <div className="lessons-container">
                {renderLessonList({
                    lessons,
                    selectedLessonId,
                    handleLessonClick: this.handleLessonClick,
                })}
                <SearchBar onSearchResults={this.handleSearchResults} />
                {this.renderLessonContent()}
            </div>
        );
    }
}

export default Lessons;
