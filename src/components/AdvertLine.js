import React, { Component } from 'react';
import '../css/AdvertLIne.css';
class AdvertLine extends Component {
  constructor(props) {
      super(props);
  }
 
  render() {
    return (
        <div id="base">
            <a href="https://www.ea.com/fr-fr/games/need-for-speed/need-for-speed-payback" target="_blank">
              <div>
                <img src="https://d3vl3jxeh4ou3u.cloudfront.net/gas%20station.jpg?AWSAccessKeyId=AKIAJNCWKHG7HVI6CO4A&Expires=2079558364&Signature=awQU2arcltoFU1RxN1WnhFMgzO8%3D" class="long" alt="run"/>
                <img src="http://kgm.kz/incom/template/template1/images/logo.png" class="ea" alt="ea"/>
                <img src="https://logos.textgiraffe.com/logos/logo-name/Sale-designstyle-sale-m.png" class="ps" alt="ps4"/>
                <div class="spin2">
                    <div class="spinner"></div>
                </div>
                <div class="slid1"></div>
                <div class="butd">
                    <button class="but">See more</button>
                </div>
                <div class="h2">
                   <h1>Available</h1>
                </div>
              </div>
            </a>
        </div>

    );
  }
}

export default AdvertLine;
