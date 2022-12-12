import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { BoxArrowRight } from 'react-bootstrap-icons';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  const spaced = {
    letterSpacing: '2px',
  };

  return (
    <Navbar variant="dark" bg="dark" expand="lg" style={{ borderBottom: '1px solid gray' }} className="overflow-visible py-3">
      <Container fluid>
        <Navbar.Brand id={COMPONENT_IDS.NAVBAR_LOGO} as={NavLink} to="/" className="pr-3">
          <div style={{ fontFamily: 'Quicksand', fontSize: '23px', paddingBottom: '2px', paddingRight: '6rm' }}>
            m&nbsp;a&nbsp;n&nbsp;o&nbsp;a&nbsp;x&nbsp;c&nbsp;h&nbsp;a&nbsp;n&nbsp;g&nbsp;e
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Offcanvas id="basic-navbar-nav">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <div style={{ fontFamily: 'Quicksand', fontSize: '23px' }}>
                m&nbsp;a&nbsp;n&nbsp;o&nbsp;a&nbsp;x&nbsp;c&nbsp;h&nbsp;a&nbsp;n&nbsp;g&nbsp;e
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="me-auto d-flex justify-content-end">
              <Nav.Link style={spaced} id={COMPONENT_IDS.NAVBAR_SHOP} as={NavLink} to="/shop" key="shop">shop</Nav.Link>
              {currentUser ? ([

                <Nav.Link style={spaced} id={COMPONENT_IDS.NAVBAR_SELLERS} as={NavLink} to="/sellers" key="sellers">sellers</Nav.Link>,
                <Nav.Link style={spaced} id={COMPONENT_IDS.NAVBAR_SELL} as={NavLink} to="/sell" key="sell">sell</Nav.Link>,
                <Nav.Link style={spaced} id={COMPONENT_IDS.NAVBAR_MY_ITEMS} as={NavLink} to="/myitems" key="myitems">my items</Nav.Link>,
              ]) : ''}
              {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                <Nav.Link id={COMPONENT_IDS.NAVBAR_ADMIN} as={NavLink} to="/admin" key="admin">ADMIN</Nav.Link>
              ) : ''}
            </Nav>
            <Nav>
              {currentUser === '' ? (
                <Nav.Link id={COMPONENT_IDS.NAVBAR_LOGIN} href="/signin">
                  Login
                </Nav.Link>
              ) : (
                <NavDropdown id={COMPONENT_IDS.NAVBAR_USER_DROPDOWN} title={currentUser}>
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_USER_DROPDOWN_MY_PROFILE} as={NavLink} to="/profile">
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_USER_DROPDOWN_SIGNOUT} as={NavLink} to="/signout">
                    <BoxArrowRight />
                    {' '} Sign out
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;
