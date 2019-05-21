import React, { Component } from 'react';
import TextInput from '../components/Form/TextInput'
import validate from '../components/Form/validate'
import Select from '../components/Form/Select'
import '../css/Search.css';

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      formIsValid: false,
      formControls: {
        city: {
          value: '',
          valid: false,
          placeholder: 'Enter the city...',
					touched: false,
          validationRules: {
            isRequired: true
          }         
        },
        
        petrol: {
          value: 'AI-92',
          placeholder: 'Select petrol type',
          valid: false,
          touched: false,
          validationRules: {
            isRequired: true,
          },
          options: [
            { value: '92', displayValue: 'AI-92' },
            { value: '95', displayValue: 'AI-95' },
            { value: '98', displayValue: 'AI-98' },
            { value: 'dt', displayValue: 'Diesel fuel'}
          ]
        }
      }
    }
  }


  startSearch = () => {
    this.props.onSearchButtonClick({
      bodyContent: "/companyList",
      srchCity: this.state.formControls.city.value,
      srchPetrol: this.state.formControls.petrol.value});
  }

  changeHandler = event => {
    
    const name = event.target.name;
    const value = event.target.value;

    const updatedControls = {
      ...this.state.formControls
    };
    const updatedFormElement = {
      ...updatedControls[name]
    };
    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

    updatedControls[name] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      formControls: updatedControls,
      formIsValid: formIsValid
    });

}

  formSubmitHandler = () => {
    const formData = {};
    	for (let formElementId in this.state.formControls) {
	      formData[formElementId] = this.state.formControls[formElementId].value;
	    }
    
    	this.startSearch();
  }

  render() {
    return (
      <div>
        <div className= "search-main-container">
          <div className="whatisgasstation-h">
            <h1>Find Your Perfect Pit Stop</h1>
          </div>  
            
        <TextInput class="search-city" name = "city" placeholder={this.state.formControls.city.placeholder}
                                value={this.state.formControls.city.value}
                                onChange={this.changeHandler}
                                touched={this.state.formControls.city.touched}
                                valid={this.state.formControls.city.valid}/>
        <Select className="tick-petrol" name="petrol"
                    value={this.state.formControls.petrol.value}
                    onChange={this.changeHandler}
                    options={this.state.formControls.petrol.options}
                    touched={this.state.formControls.petrol.touched}
                    valid={this.state.formControls.petrol.valid}
            />
            <Link className="search-btn" to = '/companyList' onClick={this.formSubmitHandler} disabled={!this.state.formIsValid}>Search</Link>
        
        </div>
        <div className="our-benefits">
          <h4 id="title">OUR BENEFITS</h4>
            <div className="content-body">
              <div  className="content-inside">
                  <img src={require('../images/Pump.png')} className="img"/>
                  <h6>PUMP</h6>
                  <p className="content-inside-p">Find a gas stattion near you quickly</p>
              </div>
              <div  className="content-inside">
                  <img src={require('../images/Save.png')} className="img"/>
                  <h6>SAVE</h6>
                  <p className="content-inside-p">Save up earnings by choosing cheapest one</p>
              </div>
              <div  className="content-inside">
                  <img src={require('../images/rating.svg')} className="img"/>
                  <h6>RATE</h6>
                  <p className="content-inside-p">Choose the best accoring to marks of users</p>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Search;

//<button onClick={this.formSubmitHandler} disabled={!this.state.formIsValid}> Search </button>