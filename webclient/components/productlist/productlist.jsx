import React from 'react';
import { Card, Icon,Button,Label,Divider,Statistic,Grid,Header,Segment,Image } from 'semantic-ui-react'

import queryString from 'query-string';
import {hashHistory} from 'react-router';
import ProductDetails from '../productDetails'
import './productlist.css'
export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      shopID:'',
      cid:'',
      sid:'',
      pid:'',
      rate: 0,
      value: '',
      openProductList:null,/*its value change as their Parent state value*/
      FilteredProducts:[],
      
    };
  }
  
  componentDidMount(){
    {this.getDetails()}
  }
  componentWillReceiveProps(nextProps){
    {this.getDetails()}
  }
getDetails=()=>{
    this.setState({openProductList:this.props.openProductList},()=>
    {
      if(Object.keys(this.props).length==4)
    {
      this.setState({shopID:this.props.shopID,cid:this.props.cid,sid:this.props.sid},
        ()=>{
          $.ajax({
            url: '/filterQuery/showFilteredProduct',
            type: 'POST',
            data:{shopID:this.state.shopID,Category:this.state.cid,SubCategory:this.state.sid,QueryDecide:3},
            
            success: function(response) {
            this.setState({FilteredProducts:response})
            }.bind(this)
          });
        })
    }
    else if((Object.keys(this.props.productDetails).length==2)||(Object.keys(this.props.productDetails).length==8)){
      $.ajax({
        url: '/filterQuery/showFilteredProduct',
        type: 'POST',
        data:this.props.productDetails,
        success: function(response) {
        this.setState({FilteredProducts:response})
        }.bind(this)
      });
    }
    })
}
redirectProduct(productID){
  var url='/productDetails?pid='+productID;
  hashHistory.push(url);
  //this.setState({pid:productID,openProductList:false})
}

  render() {

    var result = this.state.FilteredProducts.map((details,index) => {

      return (

          <Grid.Column width={5} computer={5} tablet={6} mobile={16}  key={index}>
            <Card className="product-content-card" key={index}>
              <div>
              <br/>
                <Card.Content className="color-content">
                  <h3 className="wish-brand-header">{details.brandid}</h3>
                  <br/><br/>
                  <div className="image-container">
                    <Image className="image" src={"/images/"+details.productimg[0]}   size='small'
                    />
                  </div>
                    <Label color='red' size='large'>Rs. {parseInt((details.price)-((details.price)*(details.discount)/100))}</Label>
                    <Statistic size='mini' color='red'>
                      <Statistic.Value>
                        {details.discount}%
                      </Statistic.Value>
                    </Statistic>
                    &nbsp;&nbsp;&nbsp;<strike>Rs.{details.price}</strike>
                  <div className='ui two buttons'>
                    <Button basic color='red' onClick={() => {
                    this.redirectProduct(details._id)}}>
                    View
                    </Button>
                  </div>
                </Card.Content>
              </div>
            </Card>
          </Grid.Column>              
    )

    });
    return (
      <div>
       
          <div className="ProductList-Component">
            <Grid  centered doubling columns={2}>
              <Grid.Row>
                {result}
              </Grid.Row>
            </Grid>
          </div>
        </div>     
    );
  }
}








