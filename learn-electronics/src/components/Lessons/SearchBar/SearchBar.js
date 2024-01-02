import React, { Component } from 'react';
import './SearchBar.css';
import { search, getLiked } from '../../../services/LessonServices';
import {displayError} from '../../Notify/Notify' 

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keyword: '',
            category: 'all',
            page: 1
        };
    }

    onInputChangeHandler = (event) => {
        this.setState({ keyword: event.target.value });
    };

    onCategoryChangeHandler = (event) => {
        this.setState({ category: event.target.value });
    };

    handleSearch = async (e) => {
        e.preventDefault();
        try {
            if(this.state.category === 'liked'){
                const res = await getLiked()
                if (res && res.lessons) {
                    this.props.onSearchResults(res.lessons);
                } else {
                    displayError("No response from server");
                }    
            }else{
                const res = await search(this.state.category, this.state.keyword);
                if (res && res.lessons) {
                    this.props.onSearchResults(res.lessons);
                } else {
                    displayError("No response from server");
                }
            }
        } catch (error) {
            console.error("Error while searching:", error);
            displayError("Server error while searching");
        }
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
                <select value={this.state.category} onChange={this.onCategoryChangeHandler} className='searchbar-select'>
                    <option value="all">All Categories</option>
                    <option value="lessons">Lessons</option>
                    <option value="electric-components">Electric Components</option>
                    <option value="microcontrollers">Microcontrollers</option>
                    <option value="liked">Liked</option>
                    {this.props.options}
                </select>
                <button onClick={this.handleSearch.bind(this)}>Search</button>
            </div>
        );
    }
}

export default SearchBar;
