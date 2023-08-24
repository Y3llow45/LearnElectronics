import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keyword: '',
            category: 'All',
            likes: 'All'
        };
    }

    onInputChangeHandler = (event) => {
        this.setState({ keyword: event.target.value }, () => {
            console.log(this.state.keyword);
        });
    };

    onCategoryChangeHandler = (event) => {
        this.setState({ category: event.target.value }, () => {
            console.log(this.state.category);
        });
    };

    onLikesChangeHandler = (event) => {
        this.setState({ likes: event.target.value }, () => {
            console.log(this.state.likes);
        });
    };

    handleSearch = (e) => {
        e.preventDefault();
        console.log(this.state);
        // Call your search logic here using this.state values
    };

    render() {
        return (
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for lessons..."
                    value={this.state.keyword}
                    onChange={this.onInputChangeHandler}
                />
                <select value={this.state.category} onChange={this.onCategoryChangeHandler}>
                    <option value="All">All Categories</option>
                    <option value="Lessons">Lessons</option>
                    <option value="Electric Components">Electric Components</option>
                    <option value="Microcontrollers">Microcontrollers</option>
                </select>
                <select value={this.state.likes} onChange={this.onLikesChangeHandler}>
                    <option value="All">All Likes</option>
                    <option value="Liked">Liked</option>
                    <option value="Not Liked">Not Liked</option>
                </select>
                <button onClick={this.handleSearch.bind(this)}>Search</button>
            </div>
        );
    }
}

export default SearchBar;
