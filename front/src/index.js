import React from "react";
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
// import Logo from '../Images/tesla.jpeg';
import Copyright from './components/Inscription_Connexion/connexion';
import Inscription from './components/Inscription_Connexion/inscription';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/Acceuil/acceuil.css';

import Acceuil from './components/Acceuil/acceuil';

ReactDOM.render(<Acceuil/>, document.getElementById('root'));
