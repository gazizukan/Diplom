import React, { Component } from 'react';
import AboutUs from './AboutUs'
import MapPage from './MapPage'
import HomePage from './HomePage'
import AuthorizationPage from './AuthorizationPage'
import '../css/MainPage.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

class MainPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      isAuthorized : false,
      username: "",
    };
  };

  onLogoutButtonClick = () =>{
    this.setState({
      isAuthorized: false,
      username: "",
    })
  }


  handleAuthorization = (authdata) =>{
    this.setState({
      isAuthorized: authdata.isAuthorized,
      username: authdata.username,
    })
  }

  render() {
    if(!this.state.isAuthorized){
      return (
        <div className="body-container">
          <Router>
          <div id= "header-main-container">
            <img className="logo" src={require('../images/logo-dark.svg')}alt=""/>
            <div className= "dropdown">
              <button className="dropbtn">Menu</button>
              <div className="dropdown-content">
              <Link to = '/'>Home</Link>
              <Link to = '/map'>Map</Link>
              <Link to = '/about'>About Us</Link>
              </div>
            </div>
              <Link to = '/login' className = "profileButton">Login</Link>
            </div>
            <Switch>
              <Route exact path='/' render={() => ( <HomePage/>)}/>
              <Route exact path='/map' render={() => ( <MapPage/>)}/>
              <Route exact path='/about' render={() => ( <AboutUs/>)}/>
              <Route exact path='/login' render={() => ( <AuthorizationPage onAuthorization = {this.handleAuthorization} />)}/>
            </Switch>
          </Router>
        </div>
      )
    }
   else{
      return(
        <div className="main-container">
          <Router>
          <div id= "header-main-container">
            <div className= "dropdown">
              <a className="drop">Menu</a>
              <div className="dropdown-content">
                <Link to = '/'>Home</Link>
                <Link to = '/map'>Map</Link>
                <Link to = '/about'>About Us</Link>
              </div>
            </div>
              <div >
                <button className = "profileButton" onClick = {this.onLogoutButtonClick}>Logout</button>
                <h5>{this.state.username}</h5>
              </div>
            </div>
              <Switch>
                <Route exact path='/' render={() => ( <HomePage username = {this.state.username} isAuthorized = {this.state.isAuthorized}/>)}/>
                <Route exact path='/map' render={() => ( <MapPage/>)}/>
                <Route exact path='/about' render={() => ( <AboutUs/>)}/>
              </Switch>
          </Router>
        </div>
      )
    }
}
}
export default MainPage;

library.add(faStroopwafel);


