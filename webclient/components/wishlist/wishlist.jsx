import React, { Component } from 'react';
import { Button, Grid, Card, Header,Image,Divider,Label,Input, Icon,Popup,Message } from 'semantic-ui-react';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import Cookie from 'react-cookie';
import queryString from 'query-string';
import {hashHistory} from 'react-router';
import ProductDetails from '../productDetails';
import ReactDOM from 'react-dom';
import './wishlist.css';
export default class WishlistComponent extends Component {
  constructor(props) {
    super(props);
      this.state = {
          open: false,
          flag:true,
          flag1:false,
          snackopen1:false,
          snackopen2:false,
          view:[],
          exprice:'',
          productname:'',
          productdettailflag:false,
          pid:'',
          boxdisable:false,
      };
  }
  myFunction=()=> {
   const mapRef = this.refs.snackbar;
   const node = ReactDOM.findDOMNode(mapRef);
    node.className = "show";
    setTimeout(function(){ node.className = node.className.replace("show", ""); }, 3000);
}
  handleEdit = () =>{
    this.setState({snackopen2:false});
    this.setState({flag: false});
  }
  handlePriceChange=(e)=>{
    this.setState({snackopen2:false});
    this.setState({exprice:e.target.value});
  }
  handleOk =(product) =>{
    if(this.state.exprice==""&&"0"){
      this.setState({snackopen2:true});
    }else{
        let obj={};
        obj['product']=product;
        obj['expectedprice']=this.state.exprice;
        $.ajax({
          url:"/userAction/update",
          type: 'PUT',
          dataType: 'JSON',
          data:obj,
      });
        {this.myFunction()};
        this.setState({snackopen2:false});
        this.setState({flag:true});
      }
  }
  handleRequestDelete = (item) =>{
    this.setState({snackopen2:false});
    var obj={};
    obj["product"]=item.product;
    $.ajax({
      url:"/userAction/deletewishlist",
      type:"DELETE",
      dataType:"JSON",
      data:obj,
      success:function(data){
      let oldWishlist=this.state.view;
        let newWishlist=oldWishlist.filter(function(list){
          if(list.product!==data.data.product){
            return list;
          }
    })
    this.setState({
    view:newWishlist
    })
    this.setState({
    snackopen1:true
    })
      }.bind(this)
    });
  }
  componentWillMount(){
    var wish={};
     wish.username=Cookie.load('username');
      $.ajax({
       url: '/userAction/view',
       type: 'POST',
       data:wish,
       success: function(response) {
         this.setState({view:response})
       }.bind(this)
     });
  }
  redirectProduct(pid){
     this.setState({productdettailflag:true,pid:pid})
  }

  render() {
      const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.handleClose}/>,
      ];
      return (
        <div>
        {this.state.productdettailflag?<ProductDetails productID={this.state.pid}/>
        :
        <div>
          <Grid  centered className="wishlist-card">
            <Card.Group className="Group-grid" doubling itemsPerRow={16} style={{marginTop:18,width:1067,marginLeft:78}}>
                {this.state.view.length === 0 ?
                  <div className="No-wishlist-msg">
                    <br/><br/><br/> <br/><br/><br/><br/><br/>

                    <Message className="wishlist-message-box">
                     <h2 className="No-wishlist-message">No product exist in your wishlist!!!</h2>
                    </Message>
                    <br/><br/><br/><br/><br/><br/>
                  </div>
                    : null
                }
              {this.state.view.map((item, index) => {
                  return (

                    <Card className="product-content-card" key={index}>
                      <Chip className="chip-header" style={{marginRight:-247,background:'transparent'}} onRequestDelete={() => this.handleRequestDelete(item)}/>
                        <Card.Content className="color-content">
                          <h3 className="wish-brand-header" style={{marginTop:'-40px'}} key={index}>{item.brandid}</h3>
                            <div className="image-container">
                              <Image className="image" src={"/images/"+item.productimg[0]}    size='small'
                              />
                            </div>
                            <h4 className="product">{item.product}</h4>
                              <p className='whislist-pre'><Icon id="productdetails_actualprice" name="rupee">{item.price}</Icon>({item.discount}%&nbsp;OFF)
                              </p>
                            <Icon id="whislist_discount" name="rupee">{parseInt((item.price)-((item.price)*(item.discount)/100))}</Icon>
                            <Divider inverted />
                              <div>
                                <h4 className="Expp-price">My Expected Price</h4>
                                </div>
                                <div className="vendor-detail">
                                  <h4><Input labelPosition='right' type='text' placeholder='Exp-Price' size="small" disabled={this.state.flag}
                                        defaultValue={item.expectedprice?item.expectedprice:item.price} onChange={this.handlePriceChange}>
                                            <input/>
                                              <button className="Edit-button" onClick = {() =>{this.handleEdit();}} disabled={this.state.boxdisable}>Edit</button>
                                              <button className="Ok-button" onClick = {() => {
                                              this.handleOk(item.product);}} disabled={this.state.flag} >Ok</button>
                                            </Input>
                                             <Divider inverted />
                                      <Popup
                                        trigger={<Button>Shop details</Button>}
                                        flowing
                                        hoverable
                                      >
                                          <Grid column width={2}>
                                              <Grid.Column >
                                                <div className="wishlist-shop-detail">
                                                  <h3 className="heading-wishlist-tag" >Available in:{item.shopname}</h3>
                                                </div>
                                                <div className="wishlist-shop-detail">
                                                  <h3 className="heading-wishlist-tag" >Visit:<a href={item.shopurl}>{item.shopurl}</a></h3>
                                                </div>
                                                <div className="wishlist-shop-detail">
                                                    <h3 className="heading-wishlist-tag">Address:No.{item.address},
                                                      <h3 className="heading-wishlist-tag">{item.city},{item.state},{item.pincode}</h3>
                                                    </h3>
                                                </div>
                                            </Grid.Column>
                                          </Grid>
                                      </Popup>
                                      <Button color='orange' onClick={() => {
                                        this.redirectProduct(item.productid)
                                        }}>View More</Button>
                                  </h4>
                                </div>
                        </Card.Content>
                    </Card>

                  );
              })}
            </Card.Group>
            <div ref='snackbar' id='snackbar'>
        Expected price has been set for this Product

      </div>

                  <Snackbar
                  open={this.state.snackopen1}
                  message="Successfully Product removed from your Wishlist"
                  autoHideDuration={4000}
                  onRequestClose={this.handleRequestClose}/>
                    <Snackbar
                  open={this.state.snackopen2}
                  message="Oops!! Empty Expected price"
                  autoHideDuration={4000}
                  onRequestClose={this.handleRequestClose}
                  />
          </Grid>
        </div>}</div>

    );
  }
}
