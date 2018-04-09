import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'semantic-ui-react';

export default class GooglePlaceAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state={address:this.props.address}
   this.geocoder = new google.maps.Geocoder();
  } 
  componentDidMount() {   
    let autocomplete = new google.maps.places.Autocomplete(
      this.refs.autocompleteinput, {componentRestrictions: {country: 'IN'}}
    );
    
    autocomplete.addListener('place_changed', ()=> {          
          var place = autocomplete.getPlace();
          var temp={
          lat:place.geometry.location.lat(),
          lng:place.geometry.location.lng()
        }
        
        if(Object.keys(temp).length >0){
      this.props.filterLocation(temp);
    }
   this.geocoder.geocode({
      latLng: temp

      }, (responses)=> {
        if (responses && responses.length > 0) {
        /*console.log(responses[0].formatted_address);*/
         //this.setState({address:responses[0].formatted_address})
         this.props.storeAddress(responses[0].formatted_address)

         this.props.getUserLocation(temp);
         this.props.changeLocationChoose(true);
         this.setState({address:responses[0].formatted_address})
      }
      
       });
        
        })

         
  }

  changeLocation=(e,data)=>{
   
    //this.props.storeAddress(data.value);
    this.setState({address:data.value})
  }

  render() {
    //console.log(this.state.address);
  

    return (
      <div id='locationfield'>
        <Input
          type='text'
         value={this.state.address} 
         onChange={this.changeLocation} 
          style={{width: '325.91px'}}
        >
          <input
            id='autocompleteinput'
            ref='autocompleteinput'
            
          />
        </Input>
      </div>
    );
  }
}
