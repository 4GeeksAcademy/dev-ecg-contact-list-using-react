import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";

import { ContactList } from "./pages/ContactList";
import { AddEditContact } from "./pages/AddEditContact";

export const App = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Contact Agenda</Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link href="/">Contact List</Nav.Link>
                        
                    </Nav>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={<ContactList />} />
                <Route path="/add-contact" element={<AddEditContact />} />
                <Route path="/edit-contact/:contactId" element={<AddEditContact />} />
                <Route path="*" element={<ContactList />} />
            </Routes> 
        </>
    );
};
