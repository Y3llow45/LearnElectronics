import React, { Component } from 'react';
import './SearchBar.css';
import { search } from '../../../services/LessonServices';

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
        this.setState({ keyword: event.target.value }, () => {
            console.log(this.state.keyword);
        });
    };

    onCategoryChangeHandler = (event) => {
        this.setState({ category: event.target.value }, () => {
            console.log(this.state.category);
        });
    };

    handleSearch = (e) => {
        e.preventDefault();
        search(this.state.category, this.state.keyword)
            .then(res => {
                if (res && res.lessons) {
                    this.props.onSearchResults(res.lessons);
                } else {
                    console.error('Invalid data format:', res);
                }
            })
            .catch(error => {
                console.error('Error fetching lessons:', error);
            })
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
                </select>
                <button onClick={this.handleSearch.bind(this)}>Search</button>
            </div>
        );
    }
}

export default SearchBar;
