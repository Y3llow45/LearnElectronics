import React, { Component } from 'react';

import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';

import createImagePlugin from '@draft-js-plugins/image';
import ImageAdd from './ImageAdd/ImageAdd';

import editorStyles from './editorStyles.module.css';

const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

const text =
  'Click on the + button below and insert "/images/canada-landscape-small.jpg" to add the landscape image. Alternativly you can use any image url on the web.';

export default class CustomImageEditor extends Component {
  state = {
    editorState: createEditorStateWithText(text),
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <div>
        <div className={editorStyles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => {
              this.editor = element;
            }}
          />
        </div>
        <ImageAdd
          editorState={this.state.editorState}
          onChange={this.onChange}
          modifier={imagePlugin.addImage}
        />
      </div>
    );
  }
}


/*import React, { Component } from 'react';
import { createEditorStateWithText } from '@draft-js-plugins/editor';
import Editor from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';
import ImageAdd from './ImageAdd/ImageAdd';
import editorStyles from './editorStyles.module.css';

const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

const text =
  'Click on the + button below and insert "/images/canada-landscape-small.jpg" to add the landscape image. Alternatively, you can use any image URL on the web.';

export default class CustomImageEditor extends Component {
  state = {
    editorState: this.props.editorState, // Use the editorState prop passed from Add.js
  };

  onChange = (editorState) => {
    this.props.onChange(editorState); // Call the onChange prop passed from Add.js
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <div>
        <div className={editorStyles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => {
              this.editor = element;
            }}
          />
        </div>
        <ImageAdd
          editorState={this.state.editorState}
          onChange={this.onChange}
          modifier={imagePlugin.addImage}
        />
      </div>
    );
  }
} */