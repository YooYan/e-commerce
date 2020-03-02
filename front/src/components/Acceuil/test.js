import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from "react-router-dom";
  import Inscription from '../Inscription_Connexion/inscription';
  import Inscription from '../Inscription_Connexion/inscription';
  import Copyright from '../Inscription_Connexion/connexion';
  // import Carousel from 'react-bootstrap/Carousel'
  import  'bootstrap/dist/css/bootstrap.min.css' ;
  import SearchField from "react-search-field";
  import Logo from '../Images/logo.png';
  import './acceuil.css';
  import img1 from '../Images/tesla.jpeg'
  import img2 from '../Images/tesla.jpeg'
  import img3 from '../Images/tesla.jpeg'
  import './Slide.css'
  import { Slide } from 'react-slideshow-image'
  import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
  const proprietes = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true
}
    class Acceuil extends React.Component{
      render() {
       
        return (
          
            
     <div className="Acc">

       <Router>
       <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home"><img src={Logo} alt="Logo" width="50" height="50" class="logo"/></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown" href="/categorie">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">categorie</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav>
      <Nav.Link href="/inscription">Inscris-toi</Nav.Link>
      <Nav.Link eventKey={2} href="/connexion">
        Connexion
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
       </Router>
       
        </div>
   
  );
    }
}

export default Acceuil;
