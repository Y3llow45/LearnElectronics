import { NavLink } from 'react-router-dom';
import {formatLikes} from '../FormatLikes/FormatLikes'

export const renderLessonList = (lessons, selectedLessonId, handleLessonClick) => {
    return (
      <div className="lesson-list">
      <div className="lesson-table-header">
          <div className="lesson-number element-header">N</div>
          <div className="lesson-title element-header element-header-title">Lesson title</div>
          <div className="lesson-author element-header">Author</div>
          <div className="lesson-likes element-header">Likes</div>
      </div> 
      {lessons.map((lesson, index) => (
          <div className="lesson-row" key={lesson._id}>
            <div className="lesson-number">{index + 1}</div>
            <NavLink
              to={`/lesson/${lesson.title}`}
              className={`special-navlink lesson-title ${selectedLessonId === lesson._id ? 'selected' : ''}`}
              onClick={() => handleLessonClick(lesson._id)}
            >
              {lesson.title}
            </NavLink>
            <div className="lesson-author">{lesson.user}</div>
            <div className="lesson-likes">{formatLikes(lesson.likes)}</div>
          </div>
      ))}
      </div>
    );
  }