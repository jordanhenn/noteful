import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import './Sidebar.css';

class Sidebar extends Component {
    render() {
    const folders = this.props.folders.map((folder) =>
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

Sidebar.defaultProps = {
    folders: []
}