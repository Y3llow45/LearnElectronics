import { Component } from "react";
import './Lessons.css';
import * as LessonService from '../../services/LessonServices';
import SearchBar from './SearchBar/SearchBar';

class Lessons extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lessons: [],
            expandedLessonId: null
        };
    }

    componentDidMount() {
        LessonService.getAll()
            .then(res => {
                if (res && res.lessons) {
                    this.setState({ lessons: res.lessons });
                } else {
                    console.error('Invalid data format:', res);
                }
            })
            .catch(error => {
                console.error('Error fetching lessons:', error);
            });
    }

    toggleContent = (lessonId) => {
        this.setState(prevState => ({
            expandedLessonId: prevState.expandedLessonId === lessonId ? null : lessonId
        }));
    };

    renderLesson(x) {
        const { expandedLessonId } = this.state;
    
        return (
            <div key={x.id} className={`lesson-bar ${expandedLessonId === x.id ? 'expanded' : ''}`}>
                <h3 className="lesson-bar-title" onClick={() => this.toggleContent(x.id)}>
                    {x.title}
                    {expandedLessonId === x.id ? '▲' : '▼'}
                </h3>
                {expandedLessonId === x.id && (
                    <div className="lesson-bar-content" dangerouslySetInnerHTML={{ __html: x.content }} />
                )}
            </div>
        );
    }
    handleSearchResults = (searchResults) => {
        this.setState({ lessons: searchResults });
    };

    render() {
        const { lessons } = this.state;

        return (
            <div className="lessons-bar">
                <SearchBar onSearchResults={this.handleSearchResults}/>
                {lessons.map(x => this.renderLesson(x))}
            </div>
        );
    }
}

export default Lessons;
