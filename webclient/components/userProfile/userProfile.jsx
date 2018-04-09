import React from 'react';
import axios from 'axios';
import {Link, hashHistory} from 'react-router'
import { Header, Image, Table, Segment, Grid, Divider, Button } from 'semantic-ui-react'
import './userProfile.css';
import Cookie from 'react-cookie';
export default class UserProfile extends React.Component{
  constructor(){
    super();
    this.state ={
      userdata: [],
      profilevalidate: false,
      dob: ''
    };
    this.userDetails = this.userDetails.bind(this);
  }
  //function to fetch data
  userDetails(){
    axios.get('/updateuserprofile/profile').then(function(response)
    {

       let info = response.data.local;
       let datedb = info.dob;
       let date = (datedb.toString()).substr(0,10);
        this.setState({
          userdata: info,
          dob: date
        });
      }.bind(this)).catch(function(error) {
              console.log(error);
          });
  }
  componentDidMount(){
      this.userDetails();
      if(Cookie.load("authType")=='facebook'||Cookie.load("authType")=='google')
        {
          this.setState({profilevalidate:false})
        }
        else{
          this.setState({profilevalidate:true})
        }
    }
  render(){
    return(
      <div>
        {this.state.profilevalidate
          ? <pre>
            <Grid>
              <Grid.Row>
                <Grid.Column width={3}>
                </Grid.Column>
                <Grid.Column width={10} id='userprofile-grid'>
                  <Segment id='userprofileInfo'>

                    <h3>Primary Information</h3>
                    <Divider/>

                    <Grid>
                      <Grid.Column width={8}>
                    <table id='userprofile-table'>
                      <tbody>
                      <tr>
                        <td>
                         <Image src='./components/userProfile/userimage1.jpg' shape='rounded'></Image>
                        </td>
                        <td className='userprofile-name'><b>{this.state.userdata.name}</b></td>
                      </tr>

                      <tr>
                        <td>Email</td>
                        <td>{this.state.userdata.email}</td>
                      </tr>

                      <tr>
                        <td>Gender</td>
                        <td>{this.state.userdata.gender}</td>
                      </tr>

                      <tr>
                        <td>Phone Number</td>
                        <td>{this.state.userdata.conntactnumber}</td>
                      </tr>

                        <tr>
                          <td>Date Of Birth<small>(yyyy-mm-dd)</small></td>
                          <td>{this.state.dob}</td>
                        </tr>

                    </tbody>
                  </table> {/*Depicting of simple html table to arrange data in a tabular form*/}
                    <br/>
                    <Link
                      to='/updateUser'>
                      <Button
                        basic
                        color='orange'>
                        EDIT
                      </Button>
                    </Link> {/* Button to edit details */}
                    </Grid.Column>
                   </Grid>
                  </Segment>{/*End of Segment*/}
                </Grid.Column>{/*End of Grid.Column*/}
              </Grid.Row>{/*End of Grid.Row*/}
            </Grid>
            </pre>
          :
        <pre>
          <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
            </Grid.Column>
            <Grid.Column width={10} id='userprofile-grid'>
              <Segment id='userprofileInfo'>
                <br/>
                <h2>Primary Information</h2>
                <br/>
                <Divider/>
                <br/>
                <Grid>
                  <Grid.Column width={8}>
              <table id='userprofile-table'>
                  <tbody>
                  <tr>
                    <td>
                      <Image src={Cookie.load('photos')} size='small' shape='rounded'></Image>
                    </td>
                    <td className='userprofile-name'><b>{Cookie.load('username')}</b></td>
                  </tr>

                  <tr>
                    <td className='userprofile-email'><b>Email</b></td>
                    <td>{Cookie.load('email')}</td>
                  </tr>
                  
                  <tr>
                    <td className='userprofile_gender'><b>Gender</b> </td>
                    <td>{Cookie.load('gender')}</td>
                  </tr>
                </tbody>
              </table>{/*Depicting of simple html table to arrange data in a tabular form*/}
              </Grid.Column>
            </Grid>
              </Segment>{/*End of Segment*/}
            </Grid.Column>{/*End of Grid.Column*/}
          </Grid.Row>{/*End of Grid.Row*/}
          </Grid>
        </pre>
      }
    </div>
  );
}
}
