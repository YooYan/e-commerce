import React, { Component } from 'react';
import axios from "axios";
import { Tab, Tabs } from 'react-bootstrap'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import {
    Link
} from "react-router-dom";




export default class Details extends Component {


    constructor() {
        super();
        this.state = {
            items: [],
            avis: '',
            note: 0,
            success: false
        }
        this.addToCart = this.addToCart.bind(this)
        this.change = this.change.bind(this)
        this.sendAvis = this.sendAvis.bind(this)
        this.note = this.note.bind(this)
    }
    addToCart() {

        if (localStorage.getItem('panier') === null) {
            let array = [this.props.match.params.id];
            localStorage.setItem('panier', JSON.stringify(array));
        } else {
            let items = JSON.parse(localStorage.getItem('panier'));
            items.push(this.props.match.params.id);
            localStorage.setItem('panier', JSON.stringify(items));
            console.log(items);
        }
    }


    componentWillMount() {
        const id = this.props.match.params.id;
        axios({
            method: 'POST',
            url: `http://127.0.0.1:8000/products/${id}`,
        }).then(res => {
            console.log(res);
            this.setState({ items: res.data });
        })
    }

    change(e) {
        this.setState({ avis: e.target.value })
        console.log(this.state.avis)
    }

    sendAvis(e) {
        let user = JSON.parse(sessionStorage.getItem('token'));
        const id = this.props.match.params.id;
        axios({
            method: 'POST',
            url: `http://127.0.0.1:8000/add/avis`,
            data: {
                id_user: user[1],
                avis: this.state.avis,
                note: this.state.note,
                product: id,
            }
        }).then(res => {
            this.setState({ response: res.data.success, avis: '', success: true })
            console.log(res);
        })
    }
    note(e) {
        this.setState({ note: e.target.value });
    }

    render() {
        let success = this.state.success ? 'Votre avis a bien été pris en compte !' : ''

        if (!sessionStorage.getItem('token')) {
            return (

                <div>
                    <div className="cardordi">
                        <div class="card mb-3">
                            <div class="row no-gutters">
                                {/* <h1>{this.state.items.title}</h1> */}
                                <div class="col-md-4">
                                    <img src="https://picsum.photos/200/300" alt="image_product" />
                                    {/* <img src={Img1} class="card-img1" alt="..."/> */}
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">{this.state.items.title}</h5>
                                        <p class="card-text">Description: {this.state.items.description} </p>
                                        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                                            <Tab eventKey="home" title="Présentation"> <br></br>
                                                <p>Prix: {this.state.items.prix}</p>
                                            </Tab>
                                        </Tabs>

                                        <Button onClick={this.addToCart}>Ajouter au panier</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                // <div>
                //     <h1>{this.state.items.title}</h1>
                //     <img src="https://picsum.photos/200/300" alt="image_product" />
                //     <p>Description: {this.state.items.description}</p>
                //     <p>Prix: {this.state.items.prix}</p>
                //     <Button onClick={this.addToCart}>Ajouter au panier</Button>
                // </div>
            )
        } else {
            return (
                <div>

                    <h1>{this.state.items.title}</h1>
                    <img src="https://picsum.photos/200/300" alt="image_product" />
                    <p>Description: {this.state.items.description}</p>
                    <p>Prix: {this.state.items.prix}</p>
                    <Button onClick={this.addToCart}>Ajouter au panier</Button>
                    <Form>
                        <Label >
                            Avis:
                            <Input type="textarea" value={this.state.avis} onChange={this.change} name="avis" placeholder="Les insultes seront sanctionés !"/>
                        </Label>
                        <Input type="select" multiple onChange={this.note}>
                            <option selected value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Input>
                        {success}
                        <Button onClick={this.sendAvis}>Envoyer</Button>
                        
                    </Form>
                    <Link to={"/avis/" + this.props.match.params.id}>Voir les avis</Link>
                </div>
            )
        }
    }
}


