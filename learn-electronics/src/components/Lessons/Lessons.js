import { Component } from "react";
import './Lessons.css';
import * as LessonService from '../../services/LessonServices';
import SearchBar from './SearchBar/SearchBar';

class Lessons extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lessons: [],
        }
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
    renderLesson(x) {
        return (
            <div key={x.id} className="lesson-bar">
                <h3 className="lesson-bar-title">{x.title}</h3>
                <div className="lesson-bar-content" dangerouslySetInnerHTML={{ __html: x.content }} />
            </div>
        );
    }

    render() {
        const { lessons } = this.state;
    
        return (
            <div className="lessons-bar">
                <SearchBar />
                {lessons.map(x => this.renderLesson(x))}
            </div>
        );
    }
    
}

export default Lessons;