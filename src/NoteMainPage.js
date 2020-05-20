import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import Note from './Note';
import './NoteMainPage.css';

class NoteMainPage extends Component {
    render() {
        return(
        <section className='NoteMainPage'>
            <Note  
                id={this.props.note.id}
                name={this.props.note.name}
                modified={this.props.note.modified}
            />
            <div className='NoteMainPage__content'>
                {this.props.note.content.split(/\n \r|\n/).map((line, i) => 
                <p key={i}>{line}</p>
                )}
            </div>
        </section>
        );
    }
}

export default NoteMainPage

NoteMainPage.defaultProps = {
    note: {
        content:'',
    }
}