import React, { Component } from  'react';
import NotefulContext from './NotefulContext';
import './AddNote.css';
import ValidationError from './ValidationError';

class AddNote extends Component {
  static contextType = NotefulContext;

  state = {
    error: null,
    name: {
        value: '',
        touched: false
    }
  };

  updateName(name) {
      this.setState({name: {value: name, touched: true}})
  }

  validateName() {
      const name = this.state.name.value.trim();
      if (name.length === 0) {
          return 'Name is required.';
      }
  }

  handleSubmit = e => {
    e.preventDefault()
    // get the form fields from the event
    const { content, folder } = e.target
    const { name } = this.state
    const note = {
      name: name.value,
      modified: '5-28-2020',
      folderId: folder.value,
      content: content.value
    }
    this.setState({ error: null })
    fetch('http://localhost:9090/notes', {
      method: 'POST',
      body: JSON.stringify(note),
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
        content.value = ''
        this.context.addNote(note)
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
    const options = this.context.folders.map(folder => 
        <option value={folder.id}>{folder.name}</option>);
    return (
      <section className='AddNote'>
        <h2>Add a Note</h2>
        <form
          className='AddNote__form'
          onSubmit={this.handleSubmit}
        >
          <div className='AddNote__error' role='alert'>
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
              placeholder='Give your new note a name'
              onChange={e => this.updateName(e.target.value)}
              required
            />
             {this.state.name.touched &&
            <ValidationError message={this.validateName()}/>}  
          </div>
          <div>
            <label htmlFor='content'>
              Content:
            </label>
            <input
              type='text'
              name='content'
              id='content'
              placeholder='Give your new note some content'
              required
            />
          </div>
          <div>
            <label htmlFor='folder'>
              Folder:
            </label>
            <select 
                id='folder'
                name="folder"
                placeholder='Pick a folder'
                required>
                {options}
            </select>
          </div>
          <div className='AddFolder__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button 
                type='submit'
                disabled={this.validateName()}>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default AddNote;