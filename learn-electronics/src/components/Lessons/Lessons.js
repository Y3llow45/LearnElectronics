import { Component } from "react";
import './Lessons.css';
import * as LessonService from '../../services/LessonServices';

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
                console.log('Response from LessonService:', res);
    
                if (res && res.lessons) {
                    this.setState({ lessons: res.lessons }, () => {
                        console.log('New State is:', this.state.lessons);
                    });
                } else {
                    console.error('Invalid data format:', res);
                }
            })
            .catch(error => {
                console.error('Error fetching lessons:', error);
            });
    }
    render() {
        const { lessons } = this.state;
    
        return (
            <div className="lessons">
                <h3>Lessons</h3>
                {lessons.map(lesson => (
                    <div key={lesson.id}>
                        <h3>{lesson.title}</h3>
                        <p>{lesson.content}</p>
                    </div>
                ))}
            </div>
        );
    }
    
}

export default Lessons;
/*{lessons.map(lesson => (
                    <li key={lesson.id}>
                        <h3>{lesson.title}</h3>
                        <p>{lesson.content}</p>
                    </li>
                ))}*/