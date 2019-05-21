import React, { Component } from 'react';
import client from '../client.js'
import ReviewForm from '../components/ReviewForm'
import '../css/StationDetailPage.css';

class StationDetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stations: [],
      reviews: []
    };

    this.handleUpdatePage = this.handleUpdatePage.bind(this);
  }

  componentDidMount(){
    client.getStations((stations) => {
      this.setState({
        stations: stations
      });
    });
    client.getReviews((reviews) => {
        this.setState({
          reviews: reviews
        });
      });
      if (this.props.isAuthorized) this.setState({username: this.props.username})
      else this.setState({username: "Anonymous"})
  }

  handleUpdatePage(){
    this.forceUpdate();
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
      <div className="station-detail-container">
        {this.state.stations.map((station) =>
        <div className="station-detail-info">
        {(station.address === this.props.selectedStation)
        ? <div className="station-detail-info-in">
            <div className="station-detail-info-left d-flex">
            <div className="station-detail-info-left-detail">
              <h4 className="station-add-name">{station.address}</h4>  
              <div class="rating">
                  <div>{
                    (0 < (this.calcRating(station.address)) < 1 ) ? <img class="rate-img" src={require('../images/rate1.png')}></img> 
                  : (1 < (this.calcRating(station.address)) < 2 ) ? <img class="rate-img" src={require('../images/rate2.png')}></img>  
                  : (2 < (this.calcRating(station.address))< 3 ) ? <img class="rate-img" src={require('../images/rate3.png')}></img> 
                  : (3 < (this.calcRating(station.address))< 4 ) ? <img class="rate-img" src={require('../images/rate4.png')}></img>
                  : (4 < (this.calcRating(station.address))< 5 ) ? <img class="rate-img" src={require('../images/rate5.png')}></img>
                  : null}
                  
                  </div>
              </div> 
              <div class="features d-flex flex-row">
                  <div class=" lists">{ (station.has_market)
                ? <img src={require('../images/shopping-cart.svg')} class="market"/>
                : null}
                <p className="features-logo-p">shop</p>
                  </div>
                  <div class="lists"> { (station.has_atm)
                ? <img src={require('../images/atm.svg')} class="market"/>  
                : null}
                <p className="features-logo-p">atm</p> 
                  </div>
                  <div class=" lists"> { (station.has_wc)
                  ? <img src={require('../images/wc.svg')} class="market"/> 
                  : null}
                  <p className="features-logo-p">wc</p>
                  </div>
                  <div class=" lists"> { (station.has_cafe)
                  ? <img src={require('../images/coffe-cup-outline.svg')} class="market"/> 
                  : null}
                  <p className="features-logo-p">cafe</p>
                  </div>
                  <div class="lists"> { (station.has_carwash)
                  ? <img src={require('../images/wc.svg')} class="market"/> 
                  : null}
                  <p className="features-logo-p"></p>
                  </div>
                  <div class="lists"> { (station.has_cto)
                  ?  <img src={require('../images/wc.svg')} class="market"/>
                  : null}
                  <p className="features-logo-p"></p>
                  </div>
              </div>

            </div>
           
            <div className="contact">
                  <p>{station.station_tel}</p>
                  <p className="tel">{station.station_work_our}</p>
            </div>
           
            </div>
        </div>
        : null
        }
        </div>
        )}
        <h4 className="reviews-h">Reviews:</h4>
        <div className='reviews'>
          {this.state.reviews.map((review) =>
            (review.station === this.props.selectedStation) ?
              <div className='d-flex reviews__item'>
                <div className='reviews__item__img-wrap'>
                  <img
                    src='https://image.flaticon.com/icons/svg/306/306000.svg'
                    className='reviews__item__img'
                  />
                </div>
                <div className='reviews__item__info d-flex '>
                  <div class="reviews__item__info__one d-flex flex-column">
                      <h4 className="review-author">{review.author}</h4>
                      <h4 className="review-expert">Expert</h4>
                      <img class="rate-img" src={require('../images/rate2.png')}></img> 
                  </div>
                  <div className='reviews__item__info__two d-flex flex-column'>
                    <h4 className='count-review'>24 reviews</h4>
                    <h4 className='data-comment'>Aug 10 2018</h4>
                  </div>
                </div>
                <div className='ml-3 reviews__item__content'>
                  <h4>{review.content }</h4>
                </div>
              </div>
          : null)}
        </div>
        <ReviewForm username = {this.props.username} isAuthorized = {this.props.isAuthorized} station = {this.props.selectedStation} updatePage = {this.handleUpdatePage}></ReviewForm>
      </div>
    );
  }
}

export default StationDetailPage;
