import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt, faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export const ContactCard = ({ contact, onEdit, onDelete }) => {
    return (
        <Card className="mb-3 shadow-sm">
                <Card.Body className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                        <img
                            src="https://placehold.co/150x150/lightblue/white?text=Avatar"
                            className="rounded-circle"
                            alt="Avatar de contacto"
                            style={{ width: "80px", height: "80px", objectFit: "cover" }}
                        />
                    </div>
                    <div className="flex-grow-1">
                        <Card.Title className="mb-1">{contact.name}</Card.Title>
                        <Card.Text className="text-muted mb-1">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                            {contact.address}
                        </Card.Text>
                        <Card.Text className="text-muted mb-1">
                            <FontAwesomeIcon icon={faPhone} className="me-2" />
                            {contact.phone}
                        </Card.Text>
                        <Card.Text className="text-muted mb-0">
                            <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                            {contact.email}
                        </Card.Text>
                    </div>
                    <div className="ms-auto d-flex flex-column">
                        <Button
                            variant="link" // Estilo de botón como enlace
                            className="text-primary p-0 mb-2" // Clases de Bootstrap para estilo y espaciado
                            onClick={() => onEdit(contact.id)} // Llama a la función onEdit con el ID del contacto
                        >
                            <FontAwesomeIcon icon={faPencilAlt} size="lg" /> {/* Icono de lápiz */}
                        </Button>
                        <Button
                            variant="link"
                            className="text-danger p-0"
                            onClick={() => onDelete(contact.id)} // Llama a la función onDelete con el ID del contacto
                        >
                            <FontAwesomeIcon icon={faTrash} size="lg" /> {/* Icono de papelera */}
                        </Button>
                    </div>
                </Card.Body>
        </Card>
    )
};