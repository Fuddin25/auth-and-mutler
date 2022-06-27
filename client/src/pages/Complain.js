// import hook
import React, { useEffect, useState } from "react";

import Navbar from '../components/Navbar'

// import components here
import { Container, Row, Col } from "react-bootstrap";
import Contact from "../components/complain/Contact";

// import socket.io-client 
import {io} from 'socket.io-client'

// initial variable outside component
let socket
export default function Complain() {
    // code here
    const [contact, setContact] = useState([]);
    const [contacts, setContacts] = useState([]);

    const title = "Complain"
    document.title = 'DumbMerch | ' + title

    useEffect(() =>{
        socket = io('http://localhost:5000')
        // code here
        loadContact();

        return () => {
            socket.disconnect();
        }
    }, []);

    // code here
    const loadContact = () => {
        // emit event to load admin contact
        socket.emit("load admin contact");

        // listen event to get admin contact
        socket.on("admin contact", (data) => {
            // do whatever to the data sent from server
            
            // untuk load satu admin
        //     const dataContact = { 
        //         ...data,
        //         message: "Click here to start message"
        //     };

        //     setContacts([dataContact]);
        // });
            
            // untuk load banyak admin
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
            <Navbar title={title} />
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
