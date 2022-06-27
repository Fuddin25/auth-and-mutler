// import hook
import { useEffect } from "react";
import React from 'react'

import Navbar from '../components/Navbar'

// import package here
import { io } from "socket.io-client";

// init variable here
let socket;

export default function Complain() {

    const title = "Complain"
    document.title = 'DumbMerch | ' + title

    // code here
    useEffect(() => {
        socket = io("http://localhost:5000");

        return () => {
            socket.disconnetc();
        }
    }, []);
    
    return (
        <>
            <Navbar title={title} />
        </>
    )
}
