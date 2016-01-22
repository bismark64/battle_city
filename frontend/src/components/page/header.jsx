import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const Header = () => (
  <Navbar inverse>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Battle City</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
    </Nav>
  </Navbar>
);

export default Header;