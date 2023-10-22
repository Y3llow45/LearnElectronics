import React, { useState, useEffect } from 'react';
import SearchBar from '../Lessons/SearchBar/SearchBar';

function ModeratorPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [users, setUsers] = useState([]);
  

  return (
    <div>
      <h1>Moderator Page</h1>
      <SearchBar onSearchResults={setSearchResults} />
      
    </div>
  );
}

export default ModeratorPage;
