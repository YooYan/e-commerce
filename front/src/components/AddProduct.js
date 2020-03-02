import React, { Component } from 'react';
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

export default class NewProduct extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            description: '',
            price: 0,
            response: '',
            empty: false,
            success: false,
        }
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }
    change(e) {
        if (e.target.name === "Titre") {
            this.setState({ title: e.target.value });
        } else if (e.target.name === "Description") {
            this.setState({ description: e.target.value });
        } else if (e.target.name === "Prix") {
            this.setState({ price: e.target.value });
            console.log(this.state.price)
        }
    }

    submit() {
        let session = JSON.parse(sessionStorage.getItem('token'));
        const id_user = session[1];
        if (this.state.title === "" || this.state.description === "" || this.state.price === "") {
            this.setState({ empty: true })
            return
        }

        axios({
            method: 'POST',
            url: `http://127.0.0.1:8000/add/product`,
            data: {
                title: this.state.title,
                description: this.state.description,
                price: this.state.price,
                id_user: id_user
            }
        }).then(res => {
            this.setState({ success: true })
            console.log(res);
        })
    }
    render() {
        let empty = this.state.empty ? 'Désolé un champ est manquant' : '';
        let success = this.state.success ? 'Votre produit a bien été ajouter' : '';
        return (

            <Form>
                {this.state.response}
                {empty}
                {success}
                <FormGroup>
                    <Label for="Titre">Titre</Label>
                    <Input required onChange={this.change} type="text" name="Titre" id="Titre" placeholder="Titre" />
                </FormGroup>
                <FormGroup>
                    <Label for="Description">Description</Label>
                    <Input onChange={this.change} type="text" name="Description" id="Description" placeholder="Description" required />
                </FormGroup>
                <FormGroup>
                    <Label for="Prix">Prix</Label>
                    <Input onChange={this.change} type="number" minimum="1" name="Prix" id="Prix" required />
                </FormGroup>
                <Button onClick={this.submit}>Envoyer</Button>
            </Form>
        )
    }
}