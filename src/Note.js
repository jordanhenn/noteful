import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import './Note.css';

class Note extends Component {
    render() {
        return(
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
        </div>
        );
    }
}

export default Note
