import React from 'react';
import {
    Button,
    ButtonToolbar
} from 'reactstrap';

import './achat.css';
import axios from "axios";
import Checkbox from '@material-ui/core/Checkbox';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { Row, Nav, Col } from 'react-bootstrap';
import Paypal from '../Images/paypal.png';
import Visa from '../Images/visa.png'





export default class PageAchat extends React.Component {
    constructor() {
        super()
        this.state = {
            panier: localStorage.getItem('panier'),
            items: [],
            total: 0
        }
        this.deleteToCart = this.deleteToCart.bind(this)
        this.deleteAllCart = this.deleteAllCart.bind(this)
    }

    componentDidMount() {
        axios({
            method: 'POST',
            url: `http://127.0.0.1:8000/panier`,
            data: this.state.panier
        }).then(res => {
            this.setState({ items: res.data });
            this.state.items.map((e) => {
                this.setState({ total: eval(this.state.total) + eval(e.prix) })
            })
        })
    }

    deleteToCart(id) {
        let local = JSON.parse(localStorage.getItem('panier'));
        for (let x in local) {
            if (id === parseInt(local[x])) {
                local.splice(x, 1)
                console.log(local);
                break;
            }
        }
        localStorage.setItem('panier', JSON.stringify(local))
        window.location.reload();
    }

    deleteAllCart() {
        let empty = [];
        localStorage.setItem('panier', JSON.stringify(empty));
        window.location.reload();
    }
    render() {

        return (
            <div className="achatcontain">
                <div className="cadrepanier"> <br></br>
                    <b> <center> <p> Panier : </p></center></b>
                    <ul>
                        {this.state.items.map((e, index) => {

                            return (
                                <li>{index + 1}. {e.title}  prix:{e.prix} <Button onClick={() => this.deleteToCart(e.id)}> - </Button></li>
                            )
                        })}
                    </ul>

                    <center> Payer: {this.state.total} euros <br></br> </center>
                </div>
                <div className="livraison"> <br></br>
                    <center>   <b>  <p> Choix de la livraison : </p></b></center>
                    <form>
                        <label className="adresse1">
                            Adresse :
    <input type="text" name="adresse" />
                        </label>
                        <label className="ville1">
                            Ville :
                          
      <input type="text" name="ville" />

                        </label> <br></br>
                        <label className="adresse1">
                            Prénom :
      <input type="text" />
                        </label>
                        <label className="ville1">
                            Nom :
      <input type="text" />
                        </label>

                    </form> <br></br> <br></br> <div className="checklivraison">
                        <Checkbox

                            value="primary"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        /> Livraison Express (1 jours) + 5,99€ <br></br>
                        <Checkbox

                            value="primary"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        /> LIvraison en soirée (19h-23h) + 7,99€ <br></br>
                        <Checkbox

                            value="primary"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        /> Livraison Normal (3-4 jours) +2.99 € <br></br> </div>
                    <ButtonToolbar>
                        <Button variant="warning" className="warninga">Envoyer a cet adresse</Button>
                    </ButtonToolbar>
                </div>
                <div className="payer"> <br></br>
                    <center> <b> <p> Paiement</p></b></center>
                    <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
                        <Tab eventKey="home" title="Paypal">
                            <div className="paypalle">
                                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                                    <input type="hidden" name="cmd" value="_s-xclick" />
                                    <input type="hidden" name="hosted_button_id" value="T9AMFB3F6MCHU" />
                                    <input type="image" src="https://www.paypalobjects.com/fr_FR/FR/i/btn/btn_buynow_LG.gif" border="0" name="submit" alt="PayPal, le réflexe sécurité pour payer en ligne" />
                                    <img alt="" border="0" src="https://www.paypalobjects.com/fr_FR/i/scr/pixel.gif" width="1" height="1" />
                                </form>
                            </div>
                        </Tab>
                        <Tab eventKey="profile" title="Visa">

                        </Tab>
                    </Tabs>

                </div>
            </div>
        )
    }
}