import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SchoolPage from './components/SchoolPage';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/schools/110575">School</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about" component={AboutPage}/>
          <Route path="/schools/:schoolID" component={SchoolPage} />
          <Route path="/" component={HomePage}/>
        </Switch>
      </div>
    </Router>
  );
}




export default App;
