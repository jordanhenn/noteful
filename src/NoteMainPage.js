import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import Note from './Note';
import NotefulContext from './NotefulContext';
import './NoteMainPage.css';


class NoteMainPage extends Component {
    static contextType = NotefulContext;
    render() {
        const {noteId} = this.props.match.params;
        const note = this.context.notes.find(note => note.id === noteId) || {content: ''};
        return(
        <section className='NoteMainPage'>
            <Note  
                id={note.id}
                name={note.name}
                modified={note.modified}
                history={this.props.history}
            />
            <div className='NoteMainPage__content'>
                {note.content.split(/\n \r|\n/).map((line, i) => 
                <p key={i}>{line}</p>
                )}
            </div>
        </section>
        );
    }
}

export default NoteMainPage

NoteMainPage.defaultProps = {
    match: {
        params: {},
    }
}