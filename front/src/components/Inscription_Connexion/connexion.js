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




export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      response: '',
      redirect: false
    };
    sessionStorage.setItem('token', '');
    this.submit = this.submit.bind(this);
    this.change = this.change.bind(this);
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/home',
        state: { success_auth: true },
      }}
      />
    } else {
      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Se connecter
        </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
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
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.change}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.submit}
              >
                Se connecter
          </Button>
              <Grid container>
                <Grid item>
                  <Link href="/inscription" variant="body2">
                    {"Aucun compte ? Inscrivez vous"}
                  </Link>
                </Grid>
              </Grid>
          </div>
        </Container>
        
      );
    }
  };

  submit() {
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/login',
      data: {
        email: this.state.email,
        password: this.state.password,
      }
    }).then(res => {
      if (res.data.token) {
        sessionStorage.setItem('token', JSON.stringify([res.data.token, res.data.id_user]));
        this.setState({ redirect: true })
      } else {

        this.setState({ response: res.data.error })
      }
    }).catch(function (error) {
      console.log('What happened? ' + error);
    });
  }

  change(e) {
    if (e.target.name === "email") {
      this.setState({ email: e.target.value });
    } else if (e.target.name === "password") {
      this.setState({ password: e.target.value });
    }
  }
}