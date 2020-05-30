import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import NotefulContext from './NotefulContext';
import ErrorBoundary from './ErrorBoundary';
import './Sidebar.css';

class Sidebar extends Component {
    static contextType = NotefulContext;
    render() {
    const folders = this.context.folders.map((folder) =>
        <li 
            className='folder-link' 
            key={folder.id}>
            <NavLink
                className='sidebarlink'
                to={`/folder/${folder.id}`}>
                {folder.name}
            </NavLink>
        </li>)
        return(
        <div className='folder-list'>
        <ErrorBoundary>
        <ul>
            {folders}
        </ul>
        </ErrorBoundary>
        <div className='addfolderbutton'>
        <NavLink className='addfolderlink' to={'/add-folder'}>
        Add Folder
        </NavLink>
        </div>
        </div>
        );
    }
}

export default Sidebar