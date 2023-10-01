import React, { Component } from "react";
import './Lessons.css';
import * as LessonService from '../../services/LessonServices';
import SearchBar from './SearchBar/SearchBar';

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
                    lessonsObject[lesson.id] = lesson;
                });
                    this.setState({ lessons: res.lessons });
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

    renderLessonList() {
        const { lessons, selectedLessonId } = this.state;

        return (
            <div className="lesson-list">
                {Object.keys(lessons).map(lessonId => (
                    <div
                        key={lessonId}
                        className={`lesson-title ${selectedLessonId === lessonId ? 'selected' : ''}`}
                        onClick={() => this.handleLessonClick(lessonId)}
                    >
                        {lessons[lessonId].title}
                    </div>
                ))}
            </div>
        );
    }

    renderLessonContent() {
        const { lessons, selectedLessonId } = this.state;
        const selectedLesson = lessons.find(x => x.id === selectedLessonId);

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
        this.setState({ lessons: searchResults });
    };

    render() {
        return (
            <div className="lessons-container">
                {this.renderLessonList()}
                <SearchBar onSearchResults={this.handleSearchResults} />
                {this.renderLessonContent()}
            </div>
        );
    }
}

export default Lessons;
