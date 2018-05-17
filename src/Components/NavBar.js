import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap';


export default class componentName extends Component {
    render() {
        let tableList;
        if (this.props.tables){
            tableList = this.props.tables.map((table,i) => {
                return(
                    <MenuItem key = {i} eventKey = {i}>{table}</MenuItem>
                )
            });
        }
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#brand">eSig Admin</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavDropdown eventKey={0} title="Select Table" id="basic-nav-dropdown">
                            {tableList}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
