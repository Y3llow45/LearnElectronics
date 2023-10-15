const renderLessonList = ({lessons, selectedLessonId, handleLessonClick}) => {

    return (
        <div className="lesson-list">
            {Object.keys(lessons).map(lessonId => (
                <div
                    key={lessonId}
                    className={`lesson-title ${selectedLessonId === lessonId ? 'selected' : ''}`}
                    onClick={() => handleLessonClick(lessonId)}
                >
                    {lessons[lessonId].title}
                </div>
            ))}
        </div>
    );
}

export default renderLessonList;