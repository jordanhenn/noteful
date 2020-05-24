import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import NotefulContext from './NotefulContext';
import './NoteSidebar.css';


class NoteSideBar extends Component {
    static contextType = NotefulContext;
    render() {
        const {noteId} = this.props.match.params;
        const note = this.context.notes.find(note => note.id === noteId) || {};
        const folder = this.context.folders.find(folder => folder.id === note.folderId);

        return(
        <div className='NoteSideBar'>
        <button 
            role='link'
            onClick={() => this.props.history.goBack()}
            className='BackButton'>
                Go back
            </button>
        {folder && (
            <h3 className='NoteSideBar__folder-name'>
                {folder.name}
            </h3>
        )}
        </div>
        );
    }
}

export default NoteSideBar

NoteSideBar.defaultProps = {
    history: {
        goBack: () => {}
    },
    match: {
        params: {}
    }
}