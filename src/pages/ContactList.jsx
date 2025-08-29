import { Link, useNavigate } from "react-router-dom"; 
import { Container, Row, Col, Button } from "react-bootstrap";
import { ContactCard } from "../components/ContactCard"; 
import { AppContext } from "../api/appApi"; 
import { useContext } from "react";

export const ContactList = () => {
    const {store, actions} = useContext(AppContext);
    const navigate = useNavigate();

    const handleEdit = (contactId) => {
        navigate(`/edit-contact/${contactId}`);

    };

    const handleDelete = async (contactId) => {
        const success = await actions.deleteContact(contactId);
        if (success) {
            console.log("Contact deleted succesfully");
        }
        else {
            alert("Error");
        }
    };

    return (
        <Container className="mt-4">
            <Row className="mb-4">
                <Col className="d-flex justify-content-end"> 
                    <Link to="/add-contact">
                        <Button variant="success">Add Contact</Button>
                    </Link>
                </Col>
            </Row>
            
            <Row>
                <Col>
                    {store.contacts.length === 0 ? (
                        <p className="text-center text-muted">No contacts, ¡Add a new one!</p>
                    ) : (
                        store.contacts.map((contact) => (
                            <ContactCard
                                key={contact.id}
                                contact={contact}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />    
                        ))
                    )}
                </Col>
            </Row>
        </Container>
    );    
};