import React, { Component } from 'react';
import client from '../client.js'
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/StationListPage.css';

class StationListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stations: [],
      companies: [],
      reviews: [],
    };
  }

  componentDidMount(){
    client.getStations((stations) => {
      this.setState({
        stations: stations
      });
    });
    client.getCompanies((companies) => {
        this.setState({
            companies: companies
        })
    });
    client.getReviews((reviews) => {
      this.setState({
          reviews: reviews
      })
  });
  }

  handleStationAddressClick(selectedStation){
    this.props.onStationAddressClick({bodyContent: "/stationDetail", selectedStation: selectedStation});
  }

  

  calcRating(station){
    var total = 0;
    var cnt = 0;
    this.state.reviews.map((review) =>
      {if(review.station === station){
        total += review.mark;
        cnt++;
      }}
    )
  return total/cnt;
  }

  render() {
    return (
      <div className="company-container d-flex flex-column">
        { this.state.companies.map((company) => 
        <div className="company-data"> 
        {(company.company_id === this.props.selectedCompanyId)
        ? <div className="company-info">
              <div className="company-name d-flex">
                <div className="company-logo">
                  <img src={company.company_img} alt=""/>
                </div>
                <div className="company-name-text">
                  <h1>{company.company_name}</h1>
                  <img src={company.company_rate_img} alt=""/>
                </div>
              </div>
              <div className="company-petrol-price d-flex justify-content-between">
                  <div className="petrol-box">
                    <p className="petrol-name-p">AI-92</p>
                    <p className="petrol-price-p">{company.price_for_92}</p>
                  </div>
                  <div className="petrol-box">
                    <p className="petrol-name-p">AI-95</p>
                    <p className="petrol-price-p">{company.price_for_95}</p>
                  </div>
                  <div className="petrol-box">
                    <p className="petrol-name-p">AI-98</p>
                    <p className="petrol-price-p">{company.price_for_98}</p>
                  </div>
                  <div className="petrol-box">
                    <p className="petrol-name-p">Diesel</p>
                    <p className="petrol-price-p">{company.price_for_dt}</p>
                  </div>
              </div>
          </div>
        : null
        }
        </div>
        )}
        <div className="company-street d-flex  justify-content-between">
  
        {this.state.stations.map((station) =>
        <div className="company-street-info d-flex">
        {(station.company_id === this.props.selectedCompanyId)
        ? <div className="company-street-info-in" >
            <img className="station-img" src={station.station_img} alt=""/> 
            <Link to = '/stationDetail' onClick = {this.handleStationAddressClick.bind(this, station.address)}>{station.address}</Link>
            
            <div className="station-rating">{
                  (0 < (this.calcRating(station.address)) < 1 ) ? <img class="station-rate-img" src={require('../images/rate1.png')}></img> 
                : (1 < (this.calcRating(station.address)) < 2 ) ? <img class="station-rate-img" src={require('../images/rate2.png')}></img>  
                : (2 < (this.calcRating(station.address))< 3 ) ? <img class="station-rate-img" src={require('../images/rate3.png')}></img> 
                : (3 < (this.calcRating(station.address))< 4 ) ? <img class="station-rate-img" src={require('../images/rate4.png')}></img>
                : (4 < (this.calcRating(station.address))< 5 ) ? <img class="station-rate-img" src={require('../images/rate5.png')}></img>
                : null}
            </div>
            <div className="payment-container">
                <p className="payment-head">Payment</p>
                <div className="payment d-flex flex-row ">
                  <div>{ (station.has_term)
                ? 
                <div>
                    <img src={require('../images/cash.png')} alt=""/>
                   <p className="cash-card-p">Cash</p>
                </div>
               
                : null}
                  </div>
                  <div> { (station.has_woopay)
                ? 
                <div>
                    <img src={require('../images/credit-card.png')} alt=""/>
                   <p className="cash-card-p">Card</p>
                </div>
                : null} 
                  </div>
                </div>
            </div>   
        </div>
        : null
        }
        </div>
        )}
        </div>
      </div>
    );
  }
}

export default StationListPage;


//<div onClick = {this.handleStationAddressClick.bind(this, station.address)}>
//<h1>{station.address}</h1>  
