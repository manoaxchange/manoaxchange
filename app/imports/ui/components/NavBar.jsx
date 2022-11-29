import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar variant="dark" bg="dark" expand="lg" style={{ borderBottom: '1px solid gray' }}>
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <h2>ManoaXchange</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            <Nav.Link id="add-stuff-nav" as={NavLink} to="/shop" key="shop">Shop</Nav.Link>
            <Nav.Link id="list-stuff-nav" as={NavLink} to="/list" key="list">Categories</Nav.Link>
            <Nav.Link id="list-stuff-nav" as={NavLink} to="/item" key="item">item test</Nav.Link>
            {currentUser ? ([
              <Nav.Link id="list-stuff-nav" as={NavLink} to="/sell" key="sell">Sell</Nav.Link>,
              <Nav.Link id="my-items-nav" as={NavLink} to="/myitems" key="myitems">My Items</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link id="list-stuff-nav" as={NavLink} to="/item" key="item">item testing page</Nav.Link>, <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/admin" key="admin">Admin</Nav.Link>
            ) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-my-profile" as={NavLink} to="/profile">
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '} Sign out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
