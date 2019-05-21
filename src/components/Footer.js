import React, { Component } from 'react';
import '../css/Footer.css';

class Footer extends Component {
  render() {
    return (
       <section id="footer">
         <div class="container">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
                  <ul class="list-unstyled list-inline social text-center">
                    <li class="list-inline-item"><a href="javascript:void();"><i class="fa fa-facebook"></i></a></li>
                    <li class="list-inline-item"><a href="javascript:void();"><i class="fa fa-twitter"></i></a></li>
                    <li class="list-inline-item"><a href="javascript:void();"><i class="fa fa-instagram"></i></a></li>
                    <li class="list-inline-item"><a href="javascript:void();"><i class="fa fa-google-plus"></i></a></li>
                    <li class="list-inline-item"><a href="javascript:void();" target="_blank"><i class="fa fa-envelope"></i></a></li>
                  </ul>
                </div>
                <hr/>
            </div>
            <div class="footer-link">
              <a class="link-home" href="">Home</a>
              <a class="link-home"  href="">About Us</a>
              <a class="link-home"  href="">Map</a>
              <a class="link-home"  href="">Login</a>
              <a class="link-home"  href="">Register</a>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
					        <p class="h6">© 2019 GasStation</p>
                </div>
                <hr/>
            </div>
         </div>
      </section>
    );
  }
}

export default Footer;
