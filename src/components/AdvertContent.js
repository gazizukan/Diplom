import React, { Component } from 'react';
import client from '../client.js';
import Footer from '../components/Footer'
import AdvertLine from '../components/AdvertLine'

class AdvertContent extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          adverts: [],
        };
      }
      componentDidMount(){
        client.getAdverts((adverts) => {
            this.setState({
              adverts: adverts
            });
          });
      }
  render() {
    return (
        <div>
            {this.state.adverts.map((advert)=>
            <div>
                {(advert.station == this.props.selectedAdvertId)
                ? <div>
                    <h1>{advert.content}</h1>
                </div>
                :null
                
                }
            </div>

            )
            }
        </div>
    );
  }
}

export default AdvertContent;
