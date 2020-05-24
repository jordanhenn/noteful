import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import NotefulContext from './NotefulContext';
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
        <ul className='folder-list'>
            {folders}
        </ul>
        );
    }
}

export default Sidebar