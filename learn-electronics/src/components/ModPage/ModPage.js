// ModeratorPage.js
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import LessonList from './LessonList';
import UserList from './UserList';
import { getLessons, getUsers, deleteLesson, banUser } from './yourAPI';

function ModeratorPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [users, setUsers] = useState([]);



  return (
    <div>
      <h1>Moderator Page</h1>
      <SearchBar onSearchResults={setSearchResults} />
      <LessonList lessons={searchResults} onDelete={deleteLesson} />
      <UserList users={searchResults} onBan={banUser} />
    </div>
  );
}

export default ModeratorPage;
