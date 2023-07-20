import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {options} from '../config'
import {TreeGraph} from "./TreeGraph";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";

function App() {

    return (

        <React.Fragment>
            <Navbar bg={"dark"} variant={"dark"}>
                <NavbarBrand>
                    Binary Search Tree 
                </NavbarBrand>
            </Navbar>
            <Container>
                <Row >
                    <TreeGraph options={options}/>
                </Row>
            </Container>
        </React.Fragment>
    );
}

export default App;
