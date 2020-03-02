import React, { Component } from "react";
import { Button, Form, FormControl } from 'react-bootstrap';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import SignIn from '../Inscription_Connexion/connexion';
import Inscription from '../Inscription_Connexion/inscription';
import './acceuil.css';
import Products from '../Products';
import Details from '../Details';
import Panier from "../Panier";
import Avis from '../Avis';
import PageAchat from '../Achat/page_achat.js';
import ErrorNotFound from './ErrorNotFound.js';
import Modification from '../Modification_Profil/modification'

import NewProduct from '../AddProduct'
import { isAuth } from '../security'
// import {
//   Button
// } from 'reactstrap';


export default class Acceuil extends Component {

  constructor() {
    super()
  }
  render() {
    let nav = isAuth() ? <Logged /> : <NotLog />
    return (


      <div className="Acc">
        {/* ------- LA NAVBAR ------- */}
        <Router>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/home">Fnaque</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            {nav}
            <Form inline>
              <FormControl type="text" placeholder="Rechercher..." className="mr-sm-2" />
              <Button variant="outline-success">Rechercher</Button>
            </Form>
          </Navbar>
          <Switch>
            <Route path="/inscription">
              <Inscription />
            </Route>
            <Route path="/home">
              <Products />
            </Route>
            <Route path="/connexion">
              <SignIn />
            </Route>
            <Route path="/product/:id" render={(props) => <Details {...props} />} />
            <Route path="/panier">
              <Panier />
            </Route>
            <Route path="/avis/:id" render={(props) => <Avis {...props} />} />
            <Route path="/add/product">
              <NewProduct />
            </Route>
            <Route path="/achat">
              <Achat />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/profil/edit">
              <Modification />
            </Route>
            <Route path="*" component={ErrorNotFound} />
          </Switch>
        </Router>

        {/* ------- LE FOOTER ------- */}

        <div></div>
        <footer class="site-footer">
          <div class="container">
            <div class="row">
              <div class="col-sm-12 col-md-6">
                <h6>A propos : </h6>
                <p class="text-justify">Le e-business (abréviation de electronic business, « commerce électronique » ou, au Québec, « affaires électroniques »), désigne l'utilisation des technologies de l'information et de la communication et notamment des techniques de l'internet et de la Toile ou Web pour faire du commerce ou des affaires.</p>
              </div>
              <div class="col-xs-6 col-md-3">
                <h6>Categories</h6>
                <ul class="footer-links">
                  <li><a href="/informatique">Ordinateur</a></li>
                  <li><a href="#">Objets connectés</a></li>
                  <li><a href="#">Divers</a></li>
                </ul>
              </div>
              <div class="col-xs-6 col-md-3">
                <h6>Developpeur</h6>
                <ul class="footer-links">
                  <li><a href="https://github.com/BelkacemiAyoub">Ayoub Belkacemi</a></li>
                  <li><a href="http://scanfcode.com/contact/">Jérome Bullet</a></li>
                  <li><a href="https://lukimperinetti.com/">Luk Imperinetti</a></li>
                  <li><a href="http://yohanpiqot.space/">Yohan Piqot</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-md-8 col-sm-6 col-xs-12">
                <p class="copyright-text">Copyright &copy; 2020 All Rights Reserved by<a href="#"> Fnaque</a>.</p>
              </div>

              <div class="col-md-4 col-sm-6 col-xs-12">
                <ul class="social-icons">
                  {/* <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
      <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
      <li><a class="dribbble" href="#"><i class="fa fa-dribbble"></i></a></li> */}
                  {/* <li><a class="linkedin" href="#"><i class="fa fa-linkedin"></i></a></li>    */}
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div >
    );
  }
}

function Achat() {
  return <PageAchat />
}
function Home() {
  return (
    <div>
      <div class="box spaced-all">
        <div class="sales test-1">   </div>
      </div>
      <div class="box spaced-all clearfix">
        <div class="sales test-2"><span class="h1 editorial hidden-xs">Soldes et réductions</span></div>

      </div>
      <div className="cardpromo">
        <br></br>


        <ul class="cards">

          <li class="cards__item">
            <div class="card">
              <div class="card__image card__image--river"></div>
              <div class="card__content">
                <center><div class="card__title">Télévision</div></center>
                <p class="card__text">Découvrez notre large choix de téléviseurs. Vous trouverez votre bonheur parmi les plus grandes marques et constructeurs du marché: Samsung, Sony, Philips ou LG… ou en fonction de votre usage vous trouverez une sélection TV Petites Tailles et TV Grandes tailles. Profitez des meilleures technologies : UHD-4K, OLED ou QLED… et nos TV connectée</p><br></br><br></br><br></br>
                <button class="btn btn--block card__btn">Catégorie</button>
              </div>
            </div>
          </li>
          <li class="cards__item">
            <div class="card">
              <div class="card__image card__image--record"></div>
              <div class="card__content">
                <center><div class="card__title">Ordinateur</div></center>
                <p class="card__text">Vous souhaitez acheter un ordinateur mais vous ne savez pas lequel choisir ? Demandez-vous d'abord si vous pensez l'utiliser chez vous ou si vous avez besoin d'un ordinateur portable pour l'avoir à portée de main où que vous soyez.</p><br></br><br></br><br></br><br></br><br></br>
                <button class="btn btn--block card__btn">Catégorie</button>
              </div>
            </div>
          </li>
          <li class="cards__item">
            <div class="card">
              <div class="card__image card__image--flowers"></div>
              <div class="card__content">
                <b> <center> <div class="card__title">ASUS ROG</div></center></b>
                <p class="card__text">Bénéficiez des dernières performances en termes de gaming avec les PC gamer Asus. Articulés autour de la gamme ROG « Republic of Gamers », les PC gamer Asus disposent des dernières avancées technologiques dédiées au gaming. Equipés des cartes graphiques les plus performantes, la puissance des PC gamer d’Asus vous procure un confort de jeu ultra-réaliste sur les derniers titres les plus gourmands</p><br></br>
                <br></br><br></br> <button class="btn btn--block card__btn">Catégorie</button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="box spaced-all">
        <div class="sales test-1"><span class="btn spaced-min-right"></span>   </div>
      </div>
      <div class="box spaced-all clearfix">
        <div class="sales test-2"><span class="h1 editorial hidden-xs">Soldes et réductions</span>  </div>

      </div>
    </div>
  )
}

function NotLog() {
  return (
    <Navbar.Collapse id="responsive-navbar-nav">

      <Nav>
        <Nav.Link href="/panier">Panier</Nav.Link>
        <Nav.Link eventKey={2} href="/inscription">Inscris-toi</Nav.Link>
        <Nav.Link eventKey={2} href="/connexion">Connexion</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  )
}

function Logged() {
  return (
    <Navbar.Collapse id="responsive-navbar-nav">

      <Nav>
        <Nav.Link href="/panier">Panier</Nav.Link>
        <Nav.Link eventKey={2} href="/profil">Profil</Nav.Link>
        <Nav.Link eventKey={2} href="/settings">Parametre</Nav.Link>
        <Link to="/connexion">
          <Button renderAs="button">
            <span>Deconnecter</span>
          </Button>
        </Link>
      </Nav>
    </Navbar.Collapse>
  )
}

