import React from 'react';
import './includes/css/productDetails.css'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
// import Wifi from 'material-ui/svg-icons/Notification/wifi';
import { ReactImageMagnify } from 'react-image-magnify';
import Snackbar from 'material-ui/Snackbar';
import { hashHistory, Link } from 'react-router';
import { Segment, Input, Button, Icon, Breadcrumb, Grid,Form,Header,Image,Modal,Message,Divider,Label, Rating} from 'semantic-ui-react';
import Comment from '../comment';
import Questions from '../questions';
import queryString from 'query-string';
import Cookie from 'react-cookie';
import ReactDOM from 'react-dom';
var mainImg;
var product;
class ImageSlider extends React.Component {
  constructor(props){
      super(props);
      this._handleClick = this._handleClick.bind(this);
      this.state = {firstImg : '',
    };
    }
    _handleClick(e){
      this.setState({firstImg : e.target.src});
    }
render() {
  mainImg = this.state.firstImg ? this.state.firstImg: this.props.images[0];
  return(
        <Segment className="magnifier-view">
          <ReactImageMagnify {...{
                largeImage: {
                   alt: 'Example description',
                   src: this.state.firstImg ? this.state.firstImg: "/images/"+this.props.images[0],
                   width: 1400,
                   height: 900
                },
                smallImage: {
                   alt: 'Example description1',
                   src: this.state.firstImg ? this.state.firstImg: "/images/"+this.props.images[0],
                   width: 450,
                   height: 448
                },
                imageStyle:{
                  position: 'relative',
                  margin:'auto',
                  overflow:'hidden'
                }
              }}/>
              <div className="thumbnail">{this.props.images.map((image,index) => {
                  return(
                    <div  key={index} >
                      <img className ={mainImg==image? "selectedThumbnail" :"allThumbnail"}src={"/images/"+image} onClick={this._handleClick}/>
                    </div>
                  )
                })}
              </div>
          </Segment>
  );
};
}
export default class ProductDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      product:[],
      productID:'',
      snackopen:false,
      snackmsg: false,
      average: 0,
    images : []
    }
    };
    componentDidMount()
    {
      console.log(this.props.productID);
      this.setState({productID:this.props.productID},()=>{
        {this.getProduct(this.state.productID)}
      })
    }
    myFunction=()=> {
       const mapRef = this.refs.snackbar;
       const node = ReactDOM.findDOMNode(mapRef);
        node.className = "show";
        setTimeout(function(){ node.className = node.className.replace("show", ""); }, 3000);
      }
    getProduct=(e)=>{
      $.ajax({
          url: '/userAction/showProduct',
          type: 'POST',
          data:{productID:e},
          success: function(response) {
            this.setState({product:response,images:response.productimg})
            var total = 0;
            if(response.reviews.length == 0)
            {
           this.setState({average:0});
            }
            else{
            var totalvalue = response.reviews.map((item, index) => {
                return (total = parseInt(total) + parseInt(item.rating))
            })
            var avg = total / totalvalue.length;
            this.setState({average: Number((avg).toFixed(1))});
          }
          }.bind(this)
        });
    }
    addToWishlist=()=>{
     $.ajax({
       url: '/userAction/checkwishlist',
       type: 'POST',
       data:{wish:this.state.product},
       success: function(response) {
          if(response.length == 0)
          {
            {this.addwishlist()};
          }
          else{
          this.setState({snackmsg:true});
        }
       }.bind(this)
     });
   }
   addwishlist=()=>{
  var wish=this.state.product;
  wish.username=Cookie.load('username')
     $.ajax({
       url: '/userAction/Addtowishlist',
       type: 'POST',
       data:wish,
       success: function(response) {
          {this.myFunction()};
       }.bind(this)
     });
   }
  render(){
    return (
          <div className="product-view">
            <a id='top'></a>
            <Grid padded columns={2}>
              <Grid.Column width={9} >
                <ImageSlider
                  images={this.state.images}/>
              </Grid.Column>
              <Grid.Column width={6} computer={6} tablet={10} mobile={16}>
                <Card className="product-specification">
                  <CardText >
                    <h2>{this.state.product.productid}</h2>
                      <Divider section/>
                    <Breadcrumb>
                    <Label circular color='orange' className='productdetails_label'><b>{this.state.average}</b>
                      <Rating maxRating={1} defaultRating={1} disabled icon='star'/>
                    </Label>
                    <Breadcrumb.Divider />
                     <a href="#bottom">Q&A</a>
                     <Breadcrumb.Divider />
                     <a href="#bottom1">Reviews</a>
                     </Breadcrumb>
                     <br/><br/>
                  <p className='productdetails-pre'><Icon id="productdetails_actualprice" name="rupee">{this.state.product.price}</Icon>({this.state.product.discount}%&nbsp;OFF)
                  </p>
                  <Icon id="productdetails_discount" name="rupee">{Number(((this.state.product.price)-((this.state.product.price)*(this.state.product.discount)/100)).toFixed(1))}</Icon>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <br/>
                  <Divider section/>
                  <h4>Description:</h4>{$(this.state.product.description).text()}
                  </CardText>
                  <CardActions>
                    <div className='ui two buttons'>
                    <button id='productdetails_btn-submit' className="bttn-unite bttn-md bttn-warning bttn-block" type='submit' onClick={this.addToWishlist}>Add to Wishlist</button>
                    {/*<button id='productdetails_btn-submit' className="bttn-unite bttn-md bttn-warning bttn-block" type='submit' >More from this Vendor</button>
                                        */} {/* <RaisedButton label="Add to Wishlist" primary={true} onClick={this.addToWishlist}/>
                    <RaisedButton label="More from this Vendor" secondary={true} /> */}
                  </div>
                  </CardActions>
                </Card>
              </Grid.Column>
            </Grid>
            <div ref='snackbar' id='snackbar'>
            Product Added to wishlist
            </div>

              <Snackbar
              open={this.state.snackmsg}
              message="Already added"
              autoHideDuration={4000}/>
              <a id='bottom1'></a>
           <Comment productId={this.props.productID} getdata={this.getProduct.bind(this)}/>
           <a id='bottom'></a>
           <Questions productId={this.props.productID}/>
          </div>
    )
  }
}
