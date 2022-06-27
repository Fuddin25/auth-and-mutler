// import hook
import React, { useEffect, useState } from 'react'

import NavbarAdmin from '../components/NavbarAdmin'

// import components here
import { Container, Row, Col } from "react-bootstrap";
import Contact from "../components/complain/Contact"

// import socket.io-client 
import {io} from 'socket.io-client'

// initial variable outside socket
let socket
export default function ComplainAdmin() {
    // code here
    const [contact, setContact] = useState([]);
    const [contacts, setContacts] = useState([]);

    const title = "Complain admin"
    document.title = 'DumbMerch | ' + title

    useEffect(() =>{
        socket = io('http://localhost:5000')
        // code here
        loadContact();

        return () => {
            socket.disconnect()
        }
    }, []);

    // code here
    const loadContact = () => {
        // emit event to load customer contact
        socket.emit("load customer contact");

        // listen event to get customer contact
        socket.on("customer contact", (data) => {
            // do whatever to the data sent from server

            const dataContact = data.map((item) => {
                return {
                    ...item,
                    message: "Click here to start message"
                };
            });

            setContacts(dataContact);
        });
    }

    const onClickContact = (data) => {
        setContact(data);
    };

    return (
        <>
            <NavbarAdmin title={title} />
            {/* code here */}
            <Container fluid style={{ height: "90vh" }}>
                <Row>
                    <Col md={ 3 }>
                        <Contact clickContact={onClickContact} dataContact={contacts} contact={contact} />
                    </Col>
                </Row>
                <Row>
                    <Col md={ 8 }>

                    </Col>
                </Row>
            </Container>
        </>
    )
}
