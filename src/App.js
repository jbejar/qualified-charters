import React from 'react';
import './App.css';
import ReactGA from "react-ga";
import withTracker from './components/withTracker';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavBarComponent from "./components/NavBarComponent";
import SchoolPage from './components/SchoolPage';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';

import MostQualifiedPage from './pages/MostQualifiedPage';
import TransparencyPage from './pages/TransparencyPage';
import MeetingsPage from './pages/MeetingsPage';
import ReportsPage from './pages/ReportsPage';

function App() {
  ReactGA.initialize("UA-104442548-1", {
    debug: false
  });


  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div>
      <NavBarComponent/>
      

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about" component={withTracker(AboutPage)}/>
          <Route path="/schools/:schoolID" component={withTracker(SchoolPage)} />
          <Route path="/qualified" component={withTracker(MostQualifiedPage)}/>
          <Route path="/meetings" component={withTracker(MeetingsPage)}/>
          <Route path="/transparency" component={withTracker(TransparencyPage)}/>
          <Route path="/reports" component={withTracker(ReportsPage)}/>
          <Route path="/" component={withTracker(HomePage)}/>
        </Switch>
      </div>
    </Router>
  );
}




export default App;
