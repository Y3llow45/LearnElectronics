import React from 'react';

class DeleteConfirmationDialog extends React.Component {
  handleConfirm = (confirmed) => {
    this.props.onConfirm(confirmed);
  };

  render() {
    return (
      <div>
        <div className="delete-confirmation-dialog">
          <p>Are you sure you want to delete this lesson?</p>
          <button className='form-submit add-form-submit' onClick={() => this.handleConfirm(false)}>Cancel</button>
          <button className='red-button space-left' onClick={() => this.handleConfirm(true)}>Delete</button>
        </div>
      </div>
    );
  }
}

export default DeleteConfirmationDialog;
