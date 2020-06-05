import React, { Component, Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import NotefulContext from './NotefulContext';
import ErrorBoundary from './ErrorBoundary';
import PropTypes from 'prop-types';
import './Note.css';

function deleteNote(noteId, callback) {
    fetch(`http://localhost:9090/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        }
    })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then(data => {
            callback(noteId)
        })
        .catch(error => {
            console.error(error)
        })
}

class Note extends Component {
    static contextType = NotefulContext;
    render() {
        return(
        <ErrorBoundary>
        <NotefulContext.Consumer>
        {(context) => ( 
        <div className='Note'>
            <h2 className='Note__title'>
                <Link 
                    className='note-link'
                    to={`/note/${this.props.id}`}>
                    {this.props.name}
                </Link>
            </h2>
            <div className='date-modified'>
                <p>Date modified: {this.props.modified}</p>
            </div>
            <div className='delete-button'>
                <button
                    className='delete'
                    onClick={() => {
                        deleteNote(
                            this.props.id,
                            context.deleteNote
                        )
                        this.props.history.push('/')
                    }}>
                    Delete Note
                </button>
            </div>
        </div>
        )}
        </NotefulContext.Consumer>
        </ErrorBoundary>
        );
    }
}

export default Note

Note.propTypes = {
    id: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};