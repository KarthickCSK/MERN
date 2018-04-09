import React from 'react';
import ReactDOM from 'react-dom';
export default class Sample extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            address: '',
            long: '',
            lat: '',
            marker: 'Drag',
            location: []
        };
        this.updateMarkerPosition = this.updateMarkerPosition.bind(this);
        this.updateMarkerStatus = this.updateMarkerStatus.bind(this);
        this.updateMarkerAddress = this.updateMarkerAddress.bind(this);
        this.sendaddress = this.sendaddress.bind(this);
    }
// function to send data to the parent(sample)
   sendaddress = () =>
   {
     this.props.data(this.state.location,this.state.lat,this.state.long);
   }
    // function to set lat lng
    updateMarkerPosition = (latLng) => {
        this.setState({lat: latLng.lat()});
        this.setState({long: latLng.lng()});
    }
    // function to set marker status
    updateMarkerStatus = (str) => {
        this.setState({marker: str});
    }
    // function to set marker address
    updateMarkerAddress = (str) => {
        this.setState({address: str});
        this.setState({location: str.split(',')});
     }
// function to get the marker at specified location
        showmap =(placelat, placelong) =>
        {
      let map;
      let marker;
  if(!(this.refs.autocompleteinput.value === ''))
   {
      const mapRef = this.refs.showmap;
            const node = ReactDOM.findDOMNode(mapRef);
      const pos =
      {
        lat: placelat,
        lng: placelong
      };
      map = new google.maps.Map(node, {
            center: pos,
            zoom: 16
    });
      marker = new google.maps.Marker({
        map: map,
        position: pos,
        draggable: true,
        title: 'location'
      });
    this.setState({
        lat: pos.lat,
        long: pos.lng
    });
    this.geocodePosition(pos);
    this.event(marker, map);
    }
}
// add event listners for marker
event=(marker, map)=>
{
    let that = this;
    google.maps.event.addListener(marker, 'dragstart', function() {
    });
    google.maps.event.addListener(marker, 'drag', function() {
        that.updateMarkerStatus('Dragging...');
        that.updateMarkerPosition(marker.getPosition());
    });
    google.maps.event.addListener(marker, 'dragend', function() {
        that.updateMarkerStatus('Drag ended');
        that.geocodePosition(marker.getPosition());
            map.panTo(marker.getPosition());
    });
    google.maps.event.addListener(map, 'click', function(e) {
        that.updateMarkerPosition(e.latLng);
        that.geocodePosition(marker.getPosition());
        marker.setPosition(e.latLng);
    map.panTo(marker.getPosition());
    });
}
// function to get the location address
    geocodePosition = (pos) => {
         var that = this;
    let geocoder = new google.maps.Geocoder();
        geocoder.geocode({
      latLng: pos
      }, function(responses) {
        if (responses && responses.length > 0) {
         that.updateMarkerAddress(responses[0].formatted_address);
         that.sendaddress();
      }
      else {
        that.updateMarkerAddress('Cannot determine address at this location.');
       }
       });
    }
  // function to show the initial location of the vendor
    componentDidMount() {
        if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                        const pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                        };
                        const mapRef = this.refs.showmap;
            const node = ReactDOM.findDOMNode(mapRef);
            let map = new google.maps.Map(node, {
              center: pos,
              zoom: 16
          });
            const marker = new google.maps.Marker({
              map: map,
              position: pos,
              draggable: true,
              title: 'location'});
                        this.setState({
                            lat: pos.lat,
                            long: pos.lng
                        });
            this.geocodePosition(pos);
                        this.event(marker, map);
                });
}
    let autocomplete = new google.maps.places.Autocomplete(
      this.refs.autocompleteinput, {componentRestrictions: {country: 'IN'}}
    );
    let listenerHandle = google.maps.event.addListener(
      autocomplete, 'place_changed', () => {
      let place = autocomplete.getPlace();
            this.showmap(place.geometry.location.lat(), place.geometry.location.lng());
        });
    }
  // render
    render()
    {
        const style = {
                showmap: {
                        width: '390px',
                        height: '264px',
                        float: 'left',
                        marginTop: '20px'
                },
                inputstyle:
                {
                    width: '390px'
                }
     };
        return (
            <div>
                  <input
                    type='text'
                    placeholder='Search Location...'
                    id='autocompleteinput'
                    ref='autocompleteinput'
                    style={style.inputstyle}
                     />
                   <div ref="showmap" style={style.showmap}/>
                  </div>
                );
    }
}

// end of class
