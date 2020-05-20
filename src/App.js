import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import MainPage from './MainPage';
import Sidebar from './Sidebar';
import NoteSideBar from './NoteSidebar';
import NoteMainPage from './NoteMainPage';
import dummyStore from './dummy-store';
import './App.css';

class App extends Component {
  state = {
      notes: [],
      folders: []
  }

  componentDidMount() {
    setTimeout(() => this.setState(dummyStore), 600);
  }

  render() {
  return (
    <div className='App'>
      <header>
        <h1>
          <Link to='/' className='header-link'>
          Noteful
          </Link>
        </h1>
      </header>
      <div className='sidebar-and-notes'>
      <nav className='sidebar'>
        <Route 
          exact 
          key='/'
          path='/' render={(routeProps) => 
          <Sidebar
            folders={this.state.folders}
            notes={this.state.notes}
            {...routeProps}
            />}
          />
        <Route 
          exact 
          key='/folder/:folderId'
          path='/folder/:folderId' render={(routeProps) => 
          <Sidebar
            folders={this.state.folders}
            notes={this.state.notes}
            {...routeProps}
            />}
          />
        <Route path='/note/:noteId' render={(routeProps) => {
          const {noteId} = routeProps.match.params;
          const note = this.state.notes.find(note => note.id === noteId) || {};
          const folder = this.state.folders.find(folder => folder.id === note.folderId);
          return(
          <div className='notesidebar'>
          <NoteSideBar
            {...routeProps}
            note={note}
            folder={folder}
            />
          </div>
          )}}
          />
      </nav>
      <main className='main_page'>
        <Route 
          exact 
          key='/'
          path='/' 
          render={(routeProps) => { 
          const notesForFolder = this.state.notes;
          return(
          <MainPage
            {...routeProps}
            notes={notesForFolder}
            />)}}
          />
        <Route 
          exact 
          key='/folder/:folderId'
          path='/folder/:folderId' 
          render={(routeProps) => { 
          const {folderId} = routeProps.match.params;
          const notesForFolder = this.state.notes.filter(note => note.folderId === folderId);
          return(
          <MainPage
            {...routeProps}
            notes={notesForFolder}
            />)}}
          />
        <Route 
          exact 
          key='/note/:noteId'
          path='/note/:noteId' 
          render={(routeProps) => { 
          const {noteId} = routeProps.match.params;
          const note = this.state.notes.find(note => note.id === noteId);
          return(
          <NoteMainPage
            {...routeProps}
            note={note}
            />)}}
          />
      </main>
      </div>
    </div>
  );
  }
}

export default App;