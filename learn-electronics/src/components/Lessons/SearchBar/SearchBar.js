//import { Component } from 'react';
import './SearchBar.css'

function SearchBar() {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search for lessons..."
                value="{this.state.keyword}"
                
            />
            <select value="{this.state.category}" >
                <option value="All">All Categories</option>
                <option value="Lessons">Lessons</option>
                <option value="Electric Components">Electric Components</option>
                <option value="Microcontrollers">Microcontrollers</option>
            </select>
            <select value="{this.state.likes}">
                <option value="All">All Likes</option>
                <option value="Liked">Liked</option>
                <option value="Not Liked">Not Liked</option>
            </select>
            <button onClick="{this.handleSearch}">Search</button>
        </div>
    );
}
export default SearchBar;
