import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import './NoteSidebar.css';

class NoteSideBar extends Component {
    render() {
        return(
        <div className='NoteSideBar'>
        <button 
            role='link'
            onClick={() => this.props.history.goBack()}
            className='BackButton'>
                Go back
            </button>
        {this.props.folder && (
            <h3 className='NoteSideBar__folder-name'>
                {this.props.folder.name}
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
    }
}