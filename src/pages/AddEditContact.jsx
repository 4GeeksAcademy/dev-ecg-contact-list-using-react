import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { AppContext } from "../api/appApi";

export const AddEditContact = () => {
    const { store, actions } = useContext(AppContext);
    const navigate = useNavigate();
    const { contactId } = useParams();

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        if (contactId && store.contacts.length > 0) {
            const contactToEdit = store.contacts.find(c => c.id === parseInt(contactId));
            if (contactToEdit) {
                setContact(contactToEdit);
            } else {
                console.warn("Contact not found:", contactId);
            }
        } else if (!contactId) {
            setContact({ name: "", email: "", phone: "", address: "" });
        }
    }, [contactId, store.contacts]);

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let success = false;
        if (contactId) {
            success = await actions.updateContact(contactId, contact);
        } else {
            success = await actions.createContact(contact);
        }

        if (success) {
            navigate("/");
        } else {
            alert("Error");
        }
    };

    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">{contactId ? "Edit Contact" : "Add New Contact"}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Full Name"
                        name="name"
                        value={contact.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Phone"
                        name="phone"
                        value={contact.phone}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Address"
                        name="address"
                        value={contact.address}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                        {contactId ? "Update Contact" : "Save Contact"}
                    </Button>
                    <Button variant="secondary" onClick={() => navigate("/")}>
                        Back to Contact List
                    </Button>
                </div>
            </Form>
        </Container>
    );
};