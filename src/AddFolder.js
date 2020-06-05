import React, { Component } from  'react';
import NotefulContext from './NotefulContext';
import uniqid from 'uniqid';
import './AddFolder.css';

class AddFolder extends Component {
  static contextType = NotefulContext;

  state = {
    error: null,
  };

  handleSubmit = e => {
    e.preventDefault()
    // get the form fields from the event
    const { name } = e.target
    const folder = {
      name: name.value,
      id: uniqid()
    }
    this.setState({ error: null })
    fetch('http://localhost:9090/folders', {
      method: 'POST',
      body: JSON.stringify(folder),
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        name.value = ''
        this.context.addFolder(folder)
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ error })
      })
  }
handleClickCancel = () => {
  this.props.history.push('/')
};
  render() {
    const { error } = this.state
    return (
      <section className='AddFolder'>
        <h2>Add a folder</h2>
        <form
          className='AddFolder__form'
          onSubmit={this.handleSubmit}
        >
          <div className='AddFolder__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='name'>
              Name:
            </label>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Give your new folder a name'
              aria-label='Name for the new folder'
              aria-required='true'
              required
            />
          </div>
          <div className='AddFolder__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default AddFolder;
