import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import Note from './Note';
import './MainPage.css';

class MainPage extends Component {
    render() {
    const notes = this.props.notes.map(note =>
        <li 
            key={note.id}
            className='note-item'>
            <Note 
            id={note.id} 
            name={note.name}
            modified={note.modified}/>
        </li>)
        return(
        <ul className='folder-list'>
            {notes}
        </ul>
        );
    }
}

export default MainPage

MainPage.defaultProps = {
    notes: [],
}
