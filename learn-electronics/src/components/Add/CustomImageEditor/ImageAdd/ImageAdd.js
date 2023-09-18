import React, { Component } from 'react';
import styles from './styles.css';

export default class ImageAdd extends Component {
  state = {
    url: '',
  };

  componentDidMount() {
    document.addEventListener('click', this.closePopover);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closePopover);
  }

  onPopoverClick = () => {
    this.preventNextClose = true;
  }

  addImage = () => {
    const { editorState, onChange } = this.props;
    onChange(this.props.modifier(editorState, this.state.url));
  };

  changeUrl = (evt) => {
    this.setState({ url: evt.target.value });
  }

  render() {

    return (
      <div className={styles.addImage}>
          <input
            type="text"
            placeholder="Paste the image url …"
            className={styles.addImageInput}
            onChange={this.changeUrl}
            value={this.state.url}
          />
          <button
            className={styles.addImageConfirmButton}
            type="button"
            onClick={this.addImage}
          >
            Add
          </button>
      </div>
    );
  }
}