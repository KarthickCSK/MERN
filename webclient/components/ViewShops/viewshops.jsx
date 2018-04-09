import React from 'react';
import {Link, hashHistory} from 'react-router';
import axios from 'axios';
import { Header, Image, Table, Segment, Grid, Button } from 'semantic-ui-react'
import { Paper, Divider, RaisedButton } from 'material-ui';
import  './viewshops.css';
import queryString from 'query-string';

export default class ViewShops extends React.Component{

  constructor(props)
  {
    super(props);
    this.state=
    {
      shoparray: [],
      message: ''
    }
this.handlecallShop= this.handlecallShop.bind(this);
  }
  componentDidMount()
  {
       axios.get('/SaveShop/viewall').then(function (response)
        {
          if(response.data)
          {
            this.setState({
             shoparray:  response.data,
             message: ''
           });
          }
          else{
                      this.setState({
              shoparray:[],
              message: 'No shops added, please add one'
            })
          }

       }.bind(this)).catch(function(error) {

           }.bind(this));
    }


  handlecallShop=(data)=>{
  const path = '/vendorfilter?'+queryString.stringify({sid:data.id});
    hashHistory.push(path);
}
  render()
  {
    if (this.state.shoparray.length > 0) {
         var result = this.state.shoparray.map(function(item,index) {
             return (
               <div key={index}>
              <Grid>
                 <Grid.Row>
                   <Grid.Column width={3}></Grid.Column>
                   <Grid.Column width={10}>
                     <Segment id='profileInfo'>
                       <br/>
                       <h2>{item.shopname}</h2>
                       <br/>
                       <Divider/>
                       <br/>
                       <table>
                         <tbody>
                         <tr>
                           <td>Shop URL</td>
                           <td>{item.shopurl}</td>
                         </tr>

                         <tr>
                           <td>Contact Number</td>
                           <td>{item.contactnumber}</td>
                         </tr>

                         <tr>
                           <td>Address</td>
                           <td>{item.address}</td>
                         </tr>

                       </tbody>
                       </table>
                       <br/>
                       <Link to={`/updateshop?shopid=${item._id}`}><Button  color='orange'>Update Shop</Button></Link>
                       <Link to={`/vendorfilter?sid=${item._id}`}><Button color='green'>View Products</Button></Link>
                     </Segment>
                   </Grid.Column>
                 </Grid.Row>
               </Grid>
             </div>
             )
            });
        } else {
            return (
            <center>
                <p id='shop-message'>{this.state.message}</p>
            </center>
            );
        }
        return (
            <div>{result}</div>
  );
}
}
