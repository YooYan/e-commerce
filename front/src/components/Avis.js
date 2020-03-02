import React, { Component } from 'react';
import axios from "axios";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import {
    Link
} from "react-router-dom";


export default class Avis extends Component {
    constructor() {
        super()
        this.state = {
            avis: []
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        axios({
            method: 'POST',
            url: `http://127.0.0.1:8000/avis/${id}`,
        }).then(res => {
            this.setState({ avis: res.data });
            console.log(res);
        })
    }


    render() {
        return (
            <div>
                <h1>Liste des avis:</h1>
                <div className="avis">
                    {this.state.avis.map((e, index) => {
                        return (
                            <div id={index}>
                                <p className='name'>{e.firstname}{e.lastname}: {e.note} étoiles</p>
                                <p className="description">{e.avis}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }


}