import { NavLink } from 'react-router-dom';

export const renderPagination = (totalPages, pageNum) => {
    const currentPage = parseInt(pageNum, 10);
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