import React, { Component } from 'react';
import './404.css';

export default class ErrorNotFound extends Component {

    render() {
        return (

            <div>
                  {/* <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css' /> */}
<center> 
    <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Arvo' />
 
<section class="page_404">
   <div class="container">
       <div class="row">	
       <div class="col-sm-12 ">
       <div class="col-sm-10 col-sm-offset-1  text-center">
       <div class="four_zero_four_bg">
           <h1 class="text-center ">404</h1>
       
       
       </div>
       
       <div class="contant_box_404">
       <h3 class="h2">
       Un problème ?
       </h3>
       
       <p>Cette page est introuvable, veuillez retourner à l'accueil !</p>
       
       <a href="/home" class="link_404">Acceuil</a>
   </div>
       </div>
       </div>
       </div>
   </div>
   
</section> 
</center>


            </div>
        );
    }
}