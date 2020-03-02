import React, { Component } from 'react';
import axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

import { isAuth } from './security'
import {
    Button
} from 'reactstrap';
import Card from 'react-bootstrap/Card'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner'




export default class Products extends Component {


    constructor() {
        super();
        this.state = {
            items: [],
            new_product_button: isAuth() ? <NProduct /> : '',
            content: ""
        }
    }
    componentWillMount() {
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/products',
        }).then(res => {
            console.log(res);
            this.setState({ items: res.data });
            console.log(this.state.items);
        })

    }

    render() {
        let content = [];
        if (this.state.items.length <= 0) {
            return (
                <center>
                <div className="sweet-loading">
                    <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={200}
                        width={200}
                        timeout={3000} //3 secs
                        className="loadere"
                    />
                </div>
                </center>
            )
        } else {

            return (
                <div>
                    <h1>Accueil</h1>
                    {this.state.new_product_button}

                    {this.state.items.map((e, index) => {

                        content.push(
                            <div className="col-sm py-3" key={index}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src="https://picsum.photos/200/300" />

                                    <Card.Body>
                                        <Card.Title>{e.title}</Card.Title>
                                        <Card.Subtitle>Prix: {e.prix}</Card.Subtitle>
                                        <Card.Text>{e.description}</Card.Text>
                                        <Link to={"/product/" + e.id}>
                                            <Button variant="primary">En Savoir +</Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                        if ((index + 1) % 3 === 0) { content.push(<div className="w-100"></div>) }
                    })}

                    <div className="row">
                        {content}
                    </div>
                </div>

            )
        }
    }
}

function NProduct() {
    return (
        <Link to={"/add/product"}>
            <Button>Ajouter un article</Button>
        </Link>
    )
}