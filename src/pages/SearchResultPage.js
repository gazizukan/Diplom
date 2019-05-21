import React, { Component } from 'react';
import client from '../client.js'
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/SearchResultPage.css';


class SearchResultPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: [],
      cities: [],
      city: "",
    };
  }

  handleCityChange(newCity){
    this.setState({
      city: newCity
    })
  }

  componentDidMount(){
    client.getCompanies((companies) => {
      this.setState({
        companies: companies,
        city: this.props.srchCity
      });
    });
    client.getCities((cities) => {
      this.setState({
        cities: cities
      });
    }); 
  }

  handleCompanyNameClick(selectedCompanyId){
    this.props.onCompanyNameClick({bodyContent: "/stationList", selectedCompanyId: selectedCompanyId});
  }
  getPetrols(company, gasType){
    return company['price_for_' + gasType];
  }

  render() {
    return (
      <div className="search-container">
        <p className="petrol-p">Petrol price</p>
        {this.state.companies.map((company) =>
        <div className="companies ">
        {(company.city === this.state.city)
        ? <div className="compamies-detail d-flex">
            <div className="compamies-detail-left d-flex">
              <div>
                <img className="company-img" src={company.company_img} alt=""/>
              </div>
              <div className="compamies-detail-left-in d-flex flex-column">
                <Link className="company-name-p" to = '/stationList' onClick = {this.handleCompanyNameClick.bind(this, company.company_id)}>{company.company_name}</Link>
                <img className="company-rate-img" src={company.company_rate_img} alt=""/>
              </div>
            </div>
            <div className="petrol-price">
              <p>{this.getPetrols(company, this.props.srchPetrol)}tg</p>
            </div>
          
        </div>
        : null
        }
        </div>
        )}
        <h2 className="other-city-h">Other cities:</h2>
        <div className="other-city">
        {this.state.cities.map((city) =>
        <div className="cities">
          <h4 onClick = {() => this.handleCityChange(city.city_name)}>{city.city_name}</h4>
        </div>
        )}
        </div>
      </div>
    );
  }
}

export default SearchResultPage;

//<h1 onClick = {this.handleCompanyNameClick.bind(this, company.company_id)}>{company.company_name}</h1>
