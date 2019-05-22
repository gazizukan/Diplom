import React, { Component } from 'react';
import client from '../client.js'
import  '../css/About.css'
import Footer from '../components/Footer';

class AboutUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: [],
    };
  }

  componentDidMount(){
    client.getMembers((members) => {
      this.setState({
        members: members
      });
    });
  }

  render() {
    return (
      <div className="about-container">
        <div className="about-container-in">
        <h2 className="ab-h2">About Us</h2>
        <div className="our-company d-flex">
            <div className="our-company-text">
              <p className="zapravka-p">Zapravka</p>
              <p>Startapp website for drivers to analyze petrol type price.Using our product helps to break down
                petrol prices,find nearest gas stations,see reviews of users about gas station service.
              </p>
            </div>
            <div className="our-company-img">
                <img className="about-img" src={require('../images/about.jpg')} alt=""/>
            </div>
        </div>
        <div className="our-team d-flex">
          <h2 className="ot-h2">Our Team</h2>
          {
            this.state.members.map((member)=>
            <div className="team-card">
              <img className="team-img" src={member.member_img} alt=""/>
              <p className="team-name">{member.member_first_name}</p>
              <p className="major">{member.position}</p>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati magnam dolore eaque? Nesciunt dicta quidem quam officia mollitia atque nemo laboriosam accusamus velit tenetur architecto, magni error, sint iusto amet!</p>
            </div>
            )
          }
        </div>
        <h2 className="our-partners-h2">Our Partners</h2>
        <div className="our-partners">
            <img src="https://helios.kz/images/logo.svg" alt=""/>
            <img src={require('../images/marico-logo.png')} alt=""/>
            <img src={require('../images/kmg.png')} alt=""/>
            <img src={require('../images/company-logo-png-1.png')} alt=""/>
            <img src={require('../images/Gasprom.png')} alt=""/>
            <img className="royal" src={require('../images/royalpetrol.png')} alt=""/>
        </div>
        </div>
        <Footer></Footer>
          
      </div>
    );
  }
}

export default AboutUs;
