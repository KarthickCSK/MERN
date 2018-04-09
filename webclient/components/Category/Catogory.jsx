import React from 'react';
import {hashHistory} from 'react-router';
import queryString from 'query-string';
import {Segment,Header,Card,Loader,Grid,Form, Button, Image,Statistic,Divider,Dimmer } from 'semantic-ui-react';
import './Catogory.css'
import SubCategory from '../SubCategory';

export default class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shopID:'',
            showCategory: true,
            Category:[],
            cid:''          
        };
    }
    componentWillReceiveProps(nextProps){
      this.setState({shopID:this.props.shopID})
      $.ajax({
        url: '/userAction/showCatalogue',
        type: 'POST',
        data:{shopID:this.state.shopID},
        success: function(response) {
        this.setState({Category:response})
        }.bind(this)});
    }
    handleCategory = (categoryid) => {
      this.setState({cid:categoryid,shopID:this.state.shopID,showCategory:false});
    }
    render()
    {
      var src='';
      if(this.state.Category.length!=0)
      {
     
     var category=this.state.Category.map((items,index) => {
      var src1= items.img;
      
            return(
                <Grid  centered className="category-content-card" >
                 <Card color='red'>
                   <Card.Content>
                       <Card.Description className='image-container-category'>
                           <Image fluid className="image-category" src={"/categoryimages/"+src1}   size='small'
                              />
                       </Card.Description><Divider/>
                       <Grid>
                           <Grid.Row >
                               <Grid.Column width={8}>
                                   <Card.Header>
                                       {items._id}
                                   </Card.Header>
                                   <Card.Meta style={{'color':'#DB2828'}}>
                                       {'Max '+items.TopDiscount+'% Off'}
                                   </Card.Meta>
                               </Grid.Column>
                               <Grid.Column width={8}>
                                 <Button fluid inverted color='red' onClick={() => {
                                    this.handleCategory(items._id)}}>
                                      Explore
                                  </Button>
                               </Grid.Column>
                           </Grid.Row>
                       </Grid>
                   </Card.Content>
               </Card>
                </Grid>
            );
      })
return(

      <div>
        {this.state.showCategory?
            <div className="Category-Component">
              <Grid  centered doubling columns={2}>
                <Grid.Row>
                  {category}
                </Grid.Row>
              </Grid>
            </div>
            :
            <SubCategory shopID={this.state.shopID} cid={this.state.cid}/>
        }
      </div>
    )
  }
  else
  {
    return(
      <Dimmer inverted active className='category-loding-div'>
        <Loader size='massive' content='Loading' />
      </Dimmer>

      )
  }
       
    }
}
