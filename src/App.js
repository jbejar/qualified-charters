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
import SchoolSearchComponent from './components/SchoolSearchComponent';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap'
function App() {
  return (
    <Router>
      <div>
      <Navbar bg="light" expand="lg">
      <Link to="/"><Navbar.Brand>Qualifed Teachers</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer> */}
          {/* <LinkContainer to="/about"><Nav.Link>About</Nav.Link></LinkContainer> */}
          {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        <SchoolSearchComponent/>
      </Navbar.Collapse>
    </Navbar>

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
