class DeleteConfirmationDialog extends React.Component {
  handleConfirm = (confirmed) => {
    this.props.onConfirm(confirmed);
  };

  render() {
    return (
      <div>
        <div className="delete-confirmation-dialog">
          <p>Are you sure you want to delete this lesson?</p>
          <button onClick={() => this.handleConfirm(true)}>Confirm</button>
          <button onClick={() => this.handleConfirm(false)}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default DeleteConfirmationDialog;
