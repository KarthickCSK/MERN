import React from 'react';
import {Segment, Grid, Button,Header,Statistic,Card, Image,Divider } from 'semantic-ui-react';

import './SubCategory.css'
import ProductList from '../productlist';
import queryString from 'query-string';
import {hashHistory} from 'react-router';


export default class SubCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        shopID:'',
        cid:'',
        sid:'',
        openSubCategory: true,
        openProductList:false,/*Conditional rendering for childComponent productList*/
        product:[]
      };
    }
handleProduct = (sid) => {
    this.setState({shopID:this.state.shopID,cid:this.state.cid,sid:sid,openSubCategory:false,openProductList:true})
}

componentDidMount() {
    this.setState({shopID:this.props.shopID,cid:this.props.cid},()=>{
      console.log(this.state.shopID+":"+this.state.cid);
  $.ajax({
   url: '/userAction/showSubCategory',
   type: 'POST',
   data:{categoryID:this.state.cid,shopID:this.state.shopID},
   success: function(response) {
    console.log(response);
    this.setState({product:response})
    }.bind(this)
  });
    })
  
}

    render()
    {


var result = this.state.product.map((product,index) => {

return (
        <Grid.Column centered className="subcategory-content-card" key={index}>
        <Card color='red'>
                 <Card.Content>
                     <Card.Description className='image-container-subcategory'>
                       <Image className="image-subcategory" src={"/subcategoryimages/"+product.img}   size='small'
                    />
                     </Card.Description><Divider/>
                     <Grid>
                         <Grid.Row >
                             <Grid.Column width={8}>
                                 <Card.Header>
                                     {product._id}
                                 </Card.Header>
                                 <Card.Meta style={{'color':'#DB2828'}}>
                                     {'Max '+product.TopDiscount+'% Off'}
                                 </Card.Meta>
                             </Grid.Column>
                             <Grid.Column width={8}>
                               <Button fluid inverted color='red' onClick={() => {
                                  this.handleProduct(product._id)}}>
                                  Explore
                              </Button>
                             </Grid.Column>
                         </Grid.Row>
                     </Grid>
                 </Card.Content>
             </Card>
        </Grid.Column>

    )
        });

        return (
            <div>
              {this.state.openSubCategory?
                  <div className="SubCategory-Component">
                    <Grid  centered doubling columns={2}>
                      <Grid.Row>
                        {result}
                      </Grid.Row>
                    </Grid>
                  </div>
                  :
                  <ProductList shopID={this.state.shopID} cid={this.state.cid} sid={this.state.sid} openProductList={this.state.openProductList}/>
              }
            </div>
        )
    }
}
