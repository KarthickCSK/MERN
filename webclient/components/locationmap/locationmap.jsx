import React from 'react';
import {Link, hashHistory} from 'react-router';
import GoogleMap from 'google-map-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import GooglePlaceAutoComplete from '../placeautocomplete';
import VendorLocationMarker, {UserLocationMarker} from './mapmarker';
import SearchProduct from '../../components/searchitem';
import ShowRoomDetail2 from '../../components/ShowRoomDetail';
import Review from '../../components/review';
import { Sidebar, Segment, Dropdown, Divider, Button, Card, Menu, Image, Grid, Icon, Header, Modal, Popup } from 'semantic-ui-react';
import truffle from './images/truffle.jpg';
import vendor from './images/vendor1.jpg';
import background from './images/background.jpg';
import axios from 'axios';
import './locationmap.css';
import AutoComplete from 'material-ui/AutoComplete';
import {redA700} from 'material-ui/styles/colors';
const styles = {
  errorStyle: {
    color: redA700,
  },
  underlineStyle: {
    borderColor: redA700,
  },
  floatingLabelStyle: {
    color: redA700,
  },
  floatingLabelFocusStyle: {
    color: redA700,
  },
};
export default class LocationMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMarker: false,
      userLocation: {},
      vendorLocation :{},
      filterLocation:{},
      filterDiscount:'',
      distance : '',
      duration :'',
      category:'',
      vendorInfo:'',
      subCategory:'',
      vendorList:[],
      subCategoryOptions:[],
      categoryOptions:[],
      address:'',
      locationChoose:false,
      more:true,
      searchValue:''
    };

    this.directionsService = new google.maps.DirectionsService;
    this.mapData ='';
    this.directionsDisplay='';
    this.geocoder = new google.maps.Geocoder();
    this.detailsOfVendor='';
    this.defaultData=[];
  }

  componentDidMount(){
        if(navigator.geolocation) {
          var options = {timeout:2000};
        navigator.geolocation.watchPosition(this.showLocation, this.errorHandler, options);

}
this.showAllCategory()

  }

  showAllCategory=()=>{
    let list=[];
axios.get('http://localhost:8080/location/getVendors')
      .then((response)=> {
       response.data.map((item,index) => {
        let userLocation={};
        userLocation.lat=item.lat;
        userLocation.lng=item.lng;

        let name =()=>{
 this.mapData.setCenter(new google.maps.LatLng(userLocation.lat, userLocation.lng))
 this.handleUserLocation(userLocation)
}
      let temp={};
      temp.key=item.id;
    temp.image='/shopimages/'+item.shopimg;
      temp.header=item.name;
      temp.description=item.address;
      temp.meta='discount upto '+item.maxDiscount+'%';

      list.push(temp);
    });
    this.vendorDetails=response.data;
    this.setState({showMarker:true,vendorList:list})
     })
      .catch(function (error) {
        console.log(error);
      });

axios.get('http://localhost:8080/location/getAllData')
      .then((response)=> {
       this.defaultData=response.data;
       
     })
      .catch(function (error) {
        console.log(error);
      });



    axios.get('http://localhost:8080/location/getCategories')
      .then((response)=> {
        let temp=[]
        let defaultObj={}
        defaultObj.text='All Categories';
        defaultObj.value='all categories';
        temp.push(defaultObj);
        response.data.map((item)=>{
          let obj={}
          obj.text=item.categoryname;
          obj.value=item.categoryid;
          temp.push(obj);
        })

     // this.detailsOfVendor=list
        this.setState({categoryOptions:temp,showMarker:true,vendorList:list})
     })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleCategoryChange=(e,data)=>{
   let list=[];
    let temporary=[];
    if(data.value ==='all categories'){
      this.showAllCategory();
      this.setState({category:data.value})
    }
    else{
    axios.post('http://localhost:8080/location/filterCategory',{data:data.value})
      .then((response)=> {

      this.vendorDetails=response.data[0];
            response.data[0].map((item,index) => {
               let userLocation={};
        userLocation.lat=item.lat;
        userLocation.lng=item.lng;

        let name =()=>{
 this.mapData.setCenter(new google.maps.LatLng(userLocation.lat, userLocation.lng))
}
      let temp={};
      temp.key=index.id;
    temp.image='/shopimages/'+item.shopimg;
      temp.header=item.name;
      temp.description=item.address;
      temp.meta='discount upto '+item.maxDiscount+'%';

      list.push(temp);
    });
            let info={};
            info.text ="In "+data.value;
            info.value='1'+data.value;
            temporary.push(info);
           response.data[1][0].subcategoryid.map((item1)=>{
          let obj={}
          obj.text=item1.subcategoryname;
          obj.value=item1.subcategoryid;
          temporary.push(obj);
    })
           this.setState({category:data.value,showMarker:true,vendorList:list,subCategory:'',subCategoryOptions:temporary})
          })
      .catch(function (error) {
        console.log(error);
      });
    //this.detailsOfVendor=list
}

  }

  showLocation=(position)=> {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
           const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        if(!this.state.locationChoose){
          this.handleUserLocation(pos);
          this.geocoder.geocode({
      latLng: pos

      }, (responses)=> {
        if (responses && responses.length > 0) {
       // console.log(responses[0].formatted_address);
         //this.setState({address:responses[0].formatted_address})
         this.storeAddress(responses[0].formatted_address)

      }

       });
        }

       }
        errorHandler=(err)=> {
          if(err.code == 1) {
             console.log("Error: Access is denied!");
          }
          else if( err.code == 2) {
             console.log("Error: Position is unavailable!");
          }
       }

   handleSubCategoryChange=(e,data)=>{
    if(this.directionsDisplay !== ''){
    this.directionsDisplay.set('directions',null);
  }
  if(data.value.indexOf('1') ===0){
    let temp={};
    temp.value=data.value.substring(1);
   this.handleCategoryChange('',temp);
  }
  else{
  let list=[];
  axios.post('http://localhost:8080/location/filterSubCategory',{category:this.state.category,subCategory:data.value})
      .then((response)=> {
       response.data.map((item,index) => {
         let userLocation={};
        userLocation.lat=item.lat;
        userLocation.lng=item.lng;

        let name =()=>{
 this.mapData.setCenter(new google.maps.LatLng(userLocation.lat, userLocation.lng))
}
      let temp={};
      temp.key=item.id;
    temp.image='/shopimages/'+item.shopimg;
      temp.header=item.name;
      temp.description=item.address;
      temp.meta='discount upto '+item.maxDiscount+'%';

      list.push(temp);
    });
    this.vendorDetails=response.data;
    this.setState({subCategory:data.value,vendorList:list,showMarker:true})
     })
      .catch(function (error) {
        console.log(error);
      });

//this.detailsOfVendor=list
}
  }

  onClick=()=>{
    if(this.directionsDisplay !== ''){
    this.directionsDisplay.set('directions',null);
  }
  }


  //call on click on a marker or lable
  onChildClick=(a,b) => {
    if(this.directionsDisplay !== ''){
    this.directionsDisplay.set('directions',null);
  }
   this.directionsDisplay=new google.maps.DirectionsRenderer({map:this.mapData,draggable: true,preserveViewport: true});
   this.directionsDisplay.set('directions',null);
  this.setState({vendorLocation:b})
  this.directionsService.route({
      origin:this.state.userLocation.lat+","+this.state.userLocation.lng,
      destination:new google.maps.LatLng(b.lat, b.lng),
      travelMode: 'DRIVING'
    }, (response, status)=> {
      if (status === 'OK') {
       // console.log(response);
      let {routes}=response;
     this.setState({distance:routes[0].legs[0].distance.text,
                    duration:routes[0].legs[0].duration.text});
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
};

  //on map load assign the map object to direction service
  onMapLoad=(data) => {
  const {map} =data;
  this.mapData=map;
}

  //
  createMapOptions = (maps) => {
    return {
      mapTypeControlOptions: {
        position: maps.ControlPosition.TOP_LEFT
      },
      mapTypeControl: false,
        zoomControlOptions:{
          position: maps.ControlPosition.LEFT_TOP
        },
    };
  }

changeSearch=(data)=>{
this.setState({searchValue:data})
}  

handleNewRequest=(value,index)=>{
  
   let list=[];
axios.post('http://localhost:8080/location/searchData',{data:value})
      .then((response)=> {
        console.log(response);
       response.data.map((item,index) => {
        let userLocation={};
        userLocation.lat=item.lat;
        userLocation.lng=item.lng;

        let name =()=>{
 this.mapData.setCenter(new google.maps.LatLng(userLocation.lat, userLocation.lng))
 this.handleUserLocation(userLocation)
}
      let temp={};
      temp.key=item.id;
    temp.image='/shopimages/'+item.shopimg;
      temp.header=item.name;
      temp.description=item.address;
      temp.meta='discount upto '+item.maxDiscount+'%';

      list.push(temp);
    });
    this.vendorDetails=response.data;
    this.setState({showMarker:true,vendorList:list})
     })
      .catch(function (error) {
        console.log(error);
      });
}

  storeAddress = (data) => {

    this.setState({address:data})
  }

  //disable the vedor details sidebar on click of the cancle button
  handleCancleIcon = () => {
    this.setState({visible: !this.state.visible});
    this.directionsDisplay.set('directions',null);
  }

  //
  handleUserLocation = (userLocation) => {
    this.setState({userLocation});
  }



  onFilterClose = (e,data) => {
    this.setState({showFilter: false});
  }


  filterDiscount=(e, data)=>{
     let list=[];
     if(data.value ==='all'){
      this.showAllCategory();
      this.setState({category:'all categories'})
    }
    else{

    axios.post('http://localhost:8080/location/filterDiscount',{discount:data.value,cat:this.state.category,subCat:this.state.subCategory})
      .then((response)=> {
       response.data.map((item,index) => {
         let userLocation={};
        userLocation.lat=item.lat;
        userLocation.lng=item.lng;

        let name =()=>{
 this.mapData.setCenter(new google.maps.LatLng(userLocation.lat, userLocation.lng))
}
      let temp={};
      temp.key=item.id;
    temp.image='/shopimages/'+item.shopimg;
      temp.header=item.name;
      temp.description=item.address;
      temp.meta='discount upto '+item.maxDiscount+'%';

      list.push(temp);
    });
    this.vendorDetails=response.data;
    this.setState({showMarker:true,vendorList:list,subCategoryOptions:[],filterDiscount:data.value})
     })
      .catch(function (error) {
        console.log(error);
      });
}

   // this.setState({filterDiscount:data.value});
  }

  changeLocationChoose=( data)=>{

    this.setState({locationChoose:data});
  }

  filterLocation=(loc)=>{
    this.setState({filterLocation:loc})
  }

  handleShowMarker = () => {
    this.setState({showMarker: true});
  }

  handleReviewComponent = () => {
    this.setState({openReview: true});
  }

  handleOpenReview = () => {
    this.setState({openReview: false});
  }

 /* loadMoreVendors=()=>{
    console.log('here1');
    if(this.temp1 ===0){
      if(this.detailsOfVendor.length > 5){
        console.log('here2');
      let vendor=[]
      for (var i = this.temp1; i <= this.temp2; i++) {
        console.log('here3');
        vendor.push(this.detailsOfVendor[i]);
      }
      console.log(vendor);
      this.setState({vendorList:vendor})

    }else{
      this.setState({vendorList:this.detailsOfVendor,more:false})
      this.temp1=0; this.temp2=5
    }
    }
    else if(this.temp1 > 0){
    this.temp1+=5
    this.temp2+=5
    if(this.detailsOfVendor.length > this.temp2){
      let vendor=[]
      for (var i = this.temp1; i <= this.temp2; i++) {
        vendor.push(this.detailsOfVendor[i]);
      }
      this.setState({vendorList:vendor})
    }else{
      this.setState({vendorList:this.detailsOfVendor,more:false})
      this.temp1=0; this.temp2=5
    }

  }

  }*/

  render() {

    let markers = [];
    if(this.state.showMarker) {
      this.vendorDetails.map((item) => {
        markers.push(
          <VendorLocationMarker
            key={item.id}
            id={item.id}
            lat={item.lat}
            lng={item.lng}
            distance={this.state.distance}
            duration={this.state.duration}
            discount={item.maxDiscount}
            userLocation={this.state.userLocation}
            vendorInfo={item}
            toggleVisibility={this.toggleVisibility}
          />
        );
      });
    }

var vendorStyle={}
if(this.state.vendorList.length <= 0){
  vendorStyle={display: "none"};
}

//displaying the text on the filters
var subDisplay='';
var catDisplay='';
if(this.state.category){
 subDisplay='in '+this.state.category;
 if(this.state.subCategory){
  subDisplay=this.state.subCategory;
 }
 catDisplay=this.state.category;
}else {
 subDisplay='Select category';
 catDisplay='All categories';
}
if(this.state.category === 'all categories'){
  subDisplay='Select category';
 catDisplay='All categories';
}
//console.log(this.temp1);
const discountsFilter=[{value: 'all', text: 'All discounts'},{ value: '40', text: '10% - 40%' },{ value: '45', text: '40% - 50%' },{ value: '50', text: '>50%' }]
    return (
      <div className='locationmap-complete-container' >
        <Grid columns={2} >

        <Grid.Row className='locationmap-brand-content-dropdown' >
        <Grid.Column computer={8}>
        <div className='locationmap-contentContainer'>
        <Segment id='locationmap-segment'>
              <Grid >
                <Grid.Row columns={2} id='locationmap-grid'>
                  <Grid.Column width={11}>                  
                   {/*<Dropdown id="locationmap-dropdownCategory" text={catDisplay} onChange={this.handleCategoryChange}  selection options={this.state.categoryOptions}>
                       </Dropdown>*/}
                        <AutoComplete                           
          hintText="type anything to search"
          dataSource={this.defaultData}
          maxSearchResults={5}
          onNewRequest={this.handleNewRequest}
          value={this.state.searchValue}
          onChange={this.changeSearch}
          style={{zIndex:44}}
          textFieldStyle={{'width':'450'}}         
underlineFocusStyle={styles.underlineStyle}
        />
        
                  </Grid.Column>
                 {/* <Grid.Column >
                   <Dropdown  id="locationmap-dropdownCategory" text={subDisplay}  onChange={this.handleSubCategoryChange}  selection options={this.state.subCategoryOptions}>

                       </Dropdown>
                  </Grid.Column>*/}
                  <Grid.Column width={4} >
                {/*  <div style={{'display':'none'}}>
                   <GooglePlaceAutoComplete  getUserLocation={this.handleUserLocation} filterLocation={this.filterLocation} storeAddress={this.storeAddress} address={this.state.address} locationChoose={this.state.locationChoose}/>
                   </div>*/}
                    <Popup style={{zIndex: 2}} on='click'positioning='bottom center' trigger={<Button   color='green'  style={{paddingLeft: "40%", paddingRight: "40%", marginTop:"5px", marginLeft:"27px"}}>filter</Button>}>
                     <Popup.Header>apply filter</Popup.Header>
                     <Popup.Content>
                         <GooglePlaceAutoComplete  style={{zIndex: 2}} getUserLocation={this.handleUserLocation} filterLocation={this.filterLocation}  storeAddress={this.storeAddress} address={this.state.address} locationChoose={this.state.locationChoose} changeLocationChoose={this.changeLocationChoose}/>
                         <br/>
                          <Dropdown id='locationmap-popup' text='All discounts'   onChange={this.filterDiscount} selection options={discountsFilter} />
                          <br/>
                          <br/>
         <Dropdown id="locationmap-popup" text={catDisplay} onChange={this.handleCategoryChange}  selection options={this.state.categoryOptions}/> 
         <br/><br/>
          <Dropdown  id="locationmap-popup" text={subDisplay}  onChange={this.handleSubCategoryChange}  selection options={this.state.subCategoryOptions}/> 
          <br/>
                     </Popup.Content>
                    </Popup>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Card.Group style={vendorStyle} items={this.state.vendorList} id='locationmap-card'/>            
              </Segment>
              </div>
            </Grid.Column>
               <Grid.Column  computer={8} className='locationmap-mapColumn'>
                <div className='locationmap-mapContainer'>
                <Segment className='locationmap-mapContainer'>
                  <GoogleMap
                    bootstrapURLKeys={{ key: 'AIzaSyAmbI1G98VeqO0J-2dCqpZHPzM0hw1UbO8'}}
                    center={[this.state.userLocation.lat, this.state.userLocation.lng]}
                    defaultZoom={13}
                    options={this.createMapOptions}
                    onGoogleApiLoaded={this.onMapLoad}
                    yesIWantToUseGoogleMapApiInternals
                    onChildClick={this.onChildClick}
                    onClick={this.onClick}
                  >
                    {markers}
                    <UserLocationMarker key={4}
                    lat={this.state.userLocation.lat}
                    lng={this.state.userLocation.lng} />
                  </GoogleMap>
                  </Segment>
                </div>
              </Grid.Column >
              </Grid.Row>
            </Grid>
      </div>
    );
  }
}
