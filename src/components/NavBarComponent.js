import React from 'react'
import SchoolSearchComponent from './SchoolSearchComponent';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useLocation} from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'
export default function NavBarComponent() {
    const { search } = useLocation();
    return (
        <Navbar bg="light" expand="lg">
      <Link to={"/" + search}><Navbar.Brand>Qualifed Utah Teachers</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to={"/" + search}><Nav.Link>Home</Nav.Link></LinkContainer>
          <LinkContainer to={"/qualified" + search}><Nav.Link>Qualified</Nav.Link></LinkContainer>
          <LinkContainer to={"/meetings" + search}><Nav.Link>Meetings</Nav.Link></LinkContainer>
          <LinkContainer to={"/map" + search}><Nav.Link>Map</Nav.Link></LinkContainer>
          <LinkContainer to={"/transparency" + search}><Nav.Link>Transparency</Nav.Link></LinkContainer>
          <LinkContainer to={"/reports" + search}><Nav.Link>Reports</Nav.Link></LinkContainer>
          <LinkContainer to={"/about" + search}><Nav.Link>About</Nav.Link></LinkContainer>
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
    )
}