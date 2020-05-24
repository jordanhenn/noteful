import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import MainPage from './MainPage';
import Sidebar from './Sidebar';
import NoteSideBar from './NoteSidebar';
import NoteMainPage from './NoteMainPage';
import NotefulContext from './NotefulContext';
import dummyStore from './dummy-store';
import './App.css';


class App extends Component {
  state = {
      folders: [],
      notes: []
  }

  componentDidMount() {
    fetch(`http://localhost:9090/folders`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => response.json())
      .then(data => {
        this.setState({
          folders: data
        });
      });
    fetch(`http://localhost:9090/notes`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      })
    .then(response => response.json())
      .then(data => {
        this.setState({
          notes: data
        });
      });
  }

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note =>
      note.id !== noteId)
    this.setState({
      notes: newNotes
    })
  }

  render() {
  const contextValue = {
    folders: this.state.folders,
    notes: this.state.notes,
    deleteNote: this.deleteNote
  }

  return (
    <div className='App'>
      <header>
        <h1>
          <Link to='/' className='header-link'>
          Noteful
          </Link>
        </h1>
      </header>
    <NotefulContext.Provider value={contextValue}>
      <div className='sidebar-and-notes'>
      <nav className='sidebar'>
        <Route 
          exact 
          key='/'
          path='/' 
          component={Sidebar}
          />
        <Route 
          exact 
          key='/folder/:folderId'
          path='/folder/:folderId' 
          component={Sidebar}
          />
        <Route 
          key='/note/:noteId'
          path='/note/:noteId' 
          component={NoteSideBar}
          />
      </nav>
      <main className='main_page'>
        <Route 
          exact 
          key='/'
          path='/' 
          component={MainPage}
          />
        <Route 
          exact 
          key='/folder/:folderId'
          path='/folder/:folderId' 
          component={MainPage}
          />
        <Route 
          exact 
          key='/note/:noteId'
          path='/note/:noteId' 
          component={NoteMainPage}
          />
      </main>
      </div>
    </NotefulContext.Provider>
    </div>
  );
  }
}

export default App;