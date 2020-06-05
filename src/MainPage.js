import React, { Component, Fragment } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import NotefulContext from './NotefulContext';
import Note from './Note';
import './MainPage.css';


class MainPage extends Component {
    static contextType = NotefulContext;
    render() {
    const {folderId} = this.props.match.params;
    const notesForList = this.context.notes.filter(note => note.folderId === folderId);
    const notes = (folderId == undefined) ?
    this.context.notes.map(note =>
        <li 
            key={note.id}
            className='note-item'>
            <Note 
            id={note.id} 
            name={note.name}
            modified={note.modified}/>
        </li>)
    :notesForList.map(note =>
        <li 
            key={note.id}
            className='note-item'>
            <Note 
            id={note.id} 
            name={note.name}
            modified={note.modified}/>
        </li>)
        return(
        <div className='reverse'>
        <div className='addnotebutton'>
        <NavLink className='addnotelink' to={'/add-note'}>
        Add Note
        </NavLink>
        </div>
        <ul className='folder-list'>
            {notes}
        </ul>
        </div>
        );
    }
}

export default MainPage

MainPage.defaultProps = {
    match: {
        params: 0
    }
}
