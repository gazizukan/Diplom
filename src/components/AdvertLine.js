import React, { Component } from 'react';
import '../css/AdvertLIne.css';
import {Link} from 'react-router-dom';
import AdvertContent from '../components/AdvertContent';
class AdvertLine extends Component {
  constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
  }
  handleClick(selectedAdvertId) {
    this.props.onAdvertClick({bodyContent: "/advertcontent", selectedAdvertId: selectedAdvertId});
  }
  render() {
    return (
        <div id="base">
              <div>
                <img src="https://d3vl3jxeh4ou3u.cloudfront.net/gas%20station.jpg?AWSAccessKeyId=AKIAJNCWKHG7HVI6CO4A&Expires=2079558364&Signature=awQU2arcltoFU1RxN1WnhFMgzO8%3D" class="long" alt="run"/>
                <img src="http://kgm.kz/incom/template/template1/images/logo.png" class="ea" alt="ea"/>
                <img src="https://logos.textgiraffe.com/logos/logo-name/Sale-designstyle-sale-m.png" class="ps" alt="ps4"/>
                <div class="spin2">
                    <div class="spinner"></div>
                </div>
                <div class="slid1"></div>
                <div class="butd">
                    <Link onClick={this.handleClick} to='/advertcontent' class="but">See more</Link>
                </div>
                <div class="h2">
                   <h1>Available</h1>
                </div>
              </div>
        </div>

    );
  }
}

export default AdvertLine;
