import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import axios from "axios";
import {
  Redirect
} from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

export default class signUp extends React.Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      response: '',
    };
    this.submit = this.submit.bind(this);
    this.change = this.change.bind(this);
  }

  submit() {
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/signup',
      data: {
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
      }
    }).then(res => {
      this.setState({ response: res.data });
      console.log(res)
    }).catch(function (error) {
      console.log('What happened? ' + error); 
    });
  }

  change(e) { 
    if (e.target.name === "email") {
      this.setState({ email: e.target.value });
    } else if (e.target.name === "firstName") {
      this.setState({ firstname: e.target.value });
    } else if (e.target.name === "lastName") {
      this.setState({ lastname: e.target.value });
    } else if (e.target.name === "password") {
      this.setState({ password: e.target.value });
    }
  }

  render() {
    return (
      <div>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inscription
  </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="firstname"
          label="Prénom"
          name="firstName"
          autoFocus
          onChange={this.change}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Nom de famille"
          name="lastName"
          autoComplete="lastname"
          autoFocus
          onChange={this.change}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Adresse mail"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={this.change}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Mot de passe"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={this.change}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Se souvenir"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={this.submit}
        >
          S'inscrire
    </Button>
        <Grid container>
          <Grid item>
            <Link href="/connexion" variant="body2">
              {"Déja un compte ? Connectez vous ! "}
            </Link>
          </Grid>
        </Grid>
    </Container>
    </div>
    )
  }

}
