import React from 'react';
import logo from './logo.svg';
import './App.css';

import Store from './Store/Store.js';
import Meetup from './Components/Meetup.js';
import Users from './Components/Users.js';
//import Auth from './Auth/Auth.js';
function App() {

  //const auth = new Auth();
  return (
    <Store>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Meetup/>
        <Users/>
      </header>
    </div>
    </Store>
  );
}

export default App;
