import React from 'react';
import {Link, hashHistory} from 'react-router';
import axios from 'axios';
import { Header, Image, Table, Segment, Grid, Button, Form, Input, Radio, Icon, Popup } from 'semantic-ui-react'
import { Paper, Divider, DatePicker, Snackbar } from 'material-ui';
import './userProfile.css';
import ReactDOM from 'react-dom';
import validator from 'validator';

export default class UpdateUserProfile extends React.Component{
  constructor(props){
    super(props);
    this.state =
    {
      name:'',
      number: '',
      userdata: [],
      password: '',
      dob: '',
      gender:'',
      username: '',
      email: '',
      newpassword: '',
      confnewpassword: '',
      errormsg: '',
      isOpen: false,
      errorid: '',
      open: false,
      oldpassword: '',
      errorfield: false,
      errormsgold: '',
      errorconfmsg: '',
      errorconffield: false,
      errorname: false,
      errornamemsg: '',
      nameflag: true,
      errorphone: false,
      errorphonemsg: '',
      phoneflag: true,
      errornewpassword: false,
      errornewpsswordmsg: '',
      newpasswordflag: false,
      errorconfnewpassword: false,
      errorconfnewpasswordmsg: '',
      confnewpasswordflag: false,
      oldflag: false,
      passworddisable: true
    };
 this.userDetails = this.userDetails.bind(this);
 this.handleinputname = this.handleinputname.bind(this);
 this.handleinputphone = this.handleinputphone.bind(this);
 this.handleinputdob = this.handleinputdob.bind(this);
 this.updateUser = this.updateUser.bind(this);
 this.myFunction= this.myFunction.bind(this);
  this.flag=true;
  this.passflag= true;
  }
// snackbar
 myFunction=()=> {
   console.log('hello');
   const mapRef = this.refs.snackbar;
   const node = ReactDOM.findDOMNode(mapRef);
    node.className = "show";
    setTimeout(function(){ node.className = node.className.replace("show", ""); },1500);
}
//function to handle gender data
handleChange = (e, { value }) => this.setState({gender: value })

//function to handle opening of model window
handleOpen = (e) => {
  e.preventDefault();
    this.setState({
   isOpen: true,
    errormsg: '',
  });
}

//function to handle closing of model window
handleClose = () => {
  this.setState({
    isOpen: false,
    oldpassword: '',
    errorfield: false,
    errormsgold: '',
    errorconfmsg: '',
    errorconffield: false,
    errorname: false,
    errornamemsg: '',
    nameflag: true,
    errorphone: false,
    errorphonemsg: '',
    phoneflag: true,
    errornewpassword: false,
    errornewpsswordmsg: '',
    newpasswordflag: false,
    errorconfnewpassword: false,
    errorconfnewpasswordmsg: '',
    confnewpasswordflag: false,
    oldflag: false,
    passworddisable: true,
    confnewpassword: ''
  });
}

//function to place last name in the textfield automatically
handleinputname =(event) =>
{
  console.log(event.target.value);
  this.setState({name: event.target.value});
  if(validator.isEmpty(event.target.value))
  {
    this.setState({errorname:true, errornamemsg: 'Cannot Be Empty', nameflag:false,open: false, disable: true});
  }
  else {
    {
      this.setState({errorname: false, errornamemsg:'',nameflag:true,open: false});
      this.showSubmit();
    }
  }
}

//function to place phone in the textfield automatically
handleinputphone =(event) =>
{
  this.setState({number: event.target.value});
  if ((validator.isNumeric(event.target.value)))
  {
      if (validator.isLength((event.target.value), 10, 10)) {
          this.setState({errorphone: false, phoneflag:true, errorphonemsg: ''});
          this.showSubmit();
      } else {

          this.setState({errorphone: true, errorphonemsg: 'Should be 10 digits', phoneflag:false,open: false,disable: true});

      }
  } else {

      this.setState({errorphone: true, errorphonemsg: 'Should contains Number only', phoneflag:false,open: false,disable: true});
  }
}

//function to place dob in the textfield automatically
handleinputdob =(event) =>
{
  this.setState({dob: event.target.value});
}

//function handling password update
updatePassword= () =>{
axios.put('/updateuserprofile/updatepassword/' + this.state.email, {newpassword: this.state.newpassword}).then(function(response){
  if(response)
  {
    this.myFunction();
    this.passflag= true;
    this.setState({
      open: true,
      oldpassword: '',
      errorfield: false,
      errormsgold: '',
      errorconfmsg: '',
      errorconffield: false,
      errornewpassword: false,
      errornewpsswordmsg: '',
      newpasswordflag: false,
      errorconfnewpassword: false,
      errorconfnewpasswordmsg: '',
      confnewpasswordflag: false,
      oldflag: false,
      passworddisable: true,
      confnewpassword: ''

    })
  }
  }.bind(this));
  this.handleClose();
  this.userDetails();
}
newpassword= (e, data)=>
{
  this.setState({
    newpassword: data.value
  });
  if(validator.isEmpty(data.value))
  {

    this.setState({errornewpassword:true, errornewpsswordmsg: 'Cannot Be Empty', newpasswordflag: false,open: false, passworddisable: true});
  }
  else {
      if(data.value===this.state.oldpassword)
      {
            this.setState({errornewpassword: true, errornewpsswordmsg: 'Type new password', newpasswordflag: false,open: false, passworddisable: true})
      }
      else
        {
          this.setState({errornewpassword: false, errornewpsswordmsg:'',newpasswordflag:true,open: false});
          this.showSubmitPassword();
        }
  }
}
checkoldpassword=(e,data)=>
{
  let oldpassword= data.value;
  this.setState({oldpassword: data.value})
 if(oldpassword === this.state.password)
 {
       this.setState({
         errormsgold: '',
         errorfield: false,
         oldflag: true
       });
       this.showSubmitPassword();
     }
     else {
       {
         this.setState({errormsgold: 'Old password incorrect !',errorfield:true, oldflag: false})
       }
     }
}
//function handling old and password being written
checkconfirmPassword= (e, data)=>{

  this.setState({confnewpassword: data.value});
  let newpass = this.state.newpassword;
  let length= this.state.confnewpassword.length;
  if(validator.isEmpty(data.value))
  {

    this.setState({errorconfnewpassword:true, errorconfnewpasswordmsg: 'Cannot Be Empty', confnewpasswordflag: false,open: false, passworddisable: true});
  }
  else {
    {
      if(length>=2)
      {
           if(data.value==newpass)
           {
                      this.setState({
                        errorconffield: false,
                        errorconfmsg:'',
                        confnewpasswordflag:true,
                        passworddisable: false
                      });
           }
           else {
             {
               this.setState({
                 errorconfmsg: 'Password did not match!',
                 errorconffield: true,
                 errorconfnewpassword: false,
                 errorconfnewpasswordmsg:'',
                 confnewpasswordflag:false,
                 open: false,
                 passworddisable: true
               })
             }
           }
      }

    }
  }

}

//function handling user data update
updateUser=()=>
{
 axios.put('/updateuserprofile/update', {
   name: this.state.name,
   conntactnumber: this.state.number,
   email: this.state.email,
   password: this.state.password,
   username: this.state.username,
   gender: this.state.gender,
   dob: this.state.dob
   }).then(function(response)
     {
   console.log(response);
 }.bind(this));
}

//function handling data fetching after update
 userDetails = () =>
  {
    axios.get('/updateuserprofile/profile').then(function(response)
    {
       let info = response.data.local;
       console.log(info);
       let datedb = info.dob;
       let date = (datedb.toString()).substr(0,10);
       console.log(date);

        this.setState(
          {
          name: info.name,
          email: info.email,
          number: info.conntactnumber,
          dob: date,
          username: info.username,
          gender: info.gender,
          password: info.password

        });

      }.bind(this)).catch(function(error) {
              console.log(error);
        });
  }

  //initial rendered data
  componentDidMount()
  {
       this.userDetails();
    }

    componentWillUpdate(props,state)
    {
      if(state.nameflag){
          if(state.phoneflag){
          this.flag=false;
          }
      }
      console.log(state.passworddisable);
      console.log(state.oldflag);
      console.log(state.newpasswordflag);
      console.log(state.confnewpasswordflag);
      if(state.newpasswordflag)
      {
        if(state.confnewpasswordflag)
        {
          if(state.oldflag)
          {
              this.passflag= false;
          }

        }
      }
    }

    showSubmit=()=>{
            this.setState({disable: this.flag});
    }
    showSubmitPassword=()=>
    {
      this.setState({passworddisable: this.passflag});
    }


  render()
  {
    return(
      <div>
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>

            </Grid.Column>{/*End of Grid.Column*/}
            <Grid.Column width={10} id='userprofileform-grid'>
              <Segment>
                <Form id='userprofileform-account'>
                  <h3>Account Details</h3>
                  <br/>
                  <Form.Group widths='equal'>
                    <Form.Field>
                      <label id='label'>Email</label>
                    <input  name='email' value={this.state.email} readOnly required id='profile-disable'/>
                    </Form.Field>
                    <Form.Field>
                      <label id='label'>Name</label>
                    <input  type='password' value={this.state.password} readOnly required id='profile-disable'/>
                    </Form.Field>
                    <Popup
                      id= 'userprofile-pop'
                      trigger={
                        <Button id='userprofile-passwordbutton'>Change Password?</Button>
                    }
                    flowing
                    on ='click'
                    open={this.state.isOpen}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    positioning= 'right center'
                    >
                    <Form id='userprofileform-password'>
                      <Form.Group>
                        <Grid id='userprofile-password'>
                          <Grid.Row id='userprofile-passinput'>
                        <label id='userprofile-label'>Old Password</label>
                        <Form.Input
                          placeholder='Old Password'
                          type='password'
                          required
                          onChange={this.checkoldpassword}
                          value={this.state.oldpassword}
                          error={this.state.errorfield}
                          id='userprofile-input'/>
                        <p id='errormsg'>{this.state.errormsgold}</p>
                      </Grid.Row>{/*End of grid.row passinput old password*/}
                      <Grid.Row id='passinput'>
                        <label id='userprofile-label'>New Password</label>
                        <Form.Input
                          type='password'
                          placeholder= 'New Password'
                          required
                          error={this.state.errornewpassword}
                          onChange= {this.newpassword}
                          id= 'userprofile-input'
                        />
                      <p id='errormsg'>{this.state.errornewpsswordmsg}</p>
                    </Grid.Row>{/*End of grid.row passinput new password*/}
                    <Grid.Row id='passinput'>
                      <label id='userprofile-label'>Confirm Password</label>
                          <Form.Input
                            type='password'
                            placeholder= 'Confirm Password'
                            required
                            error={this.state.errorconffield}
                            value={this.state.confnewpassword}
                            onChange={this.checkconfirmPassword}
                            id= 'userprofile-input'
                          />
                        <p id='errormsg'>{this.state.errorconfmsg}</p>
                      </Grid.Row>{/*End of grid.row passinput confirm password*/}
                    </Grid>{/*End of grid password*/}
                  </Form.Group>{/*End of form.group*/}
                </Form>{/*End of form*/}
                  <Grid>
                    <Grid.Row>
                     <Grid.Column>
                       <Button
                          color='orange'
                          disabled={this.state.passworddisable}
                          onClick={this.updatePassword}
                          id='userprofile-passbutton'
                          basic>
                          CONFIRM
                      </Button>{/*End of form.field button*/}
                    </Grid.Column>{/*End of grid.column*/}
                  </Grid.Row>{/*End of grid.row*/}
                 </Grid>{/*End of grid*/}
               </Popup>{/*End of popup*/}
             </Form.Group>{/*End of form.group*/}
           </Form>{/*End of form*/}
            <br/>
              <Divider/>
            <br/>

                <Form id='userprofileform-general'>
                  <h3>General Information</h3>
                  {/*<Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' ref='firstName' onChange={this.handleinputfname} value={this.state.fname}/>
                  </Form.Field>{/*End of form.field first name*/}
                  <br/>
                  <Form.Field>
                    <label>Name</label>
                    <Form.Input
                      placeholder='Name'
                      ref='lastName'
                      onChange={this.handleinputname}
                      error={this.state.errorname}
                      value={this.state.name}/>
              </Form.Field>{/*End of form.field last name*/}
                  <p id='errormsg'>{this.state.errornamemsg}</p>
                  <br/>
                  <Form.Field>
                    <label>Phone Number</label>
                    <Form.Input
                      error={this.errorphone}
                      placeholder='Enter 10-digit number'
                      onChange={this.handleinputphone}
                      value={this.state.number}/>
                  </Form.Field>{/*End of form.field ph.no.*/}
                  <p id='errormsg'>{this.state.errorphonemsg}</p>
                  <br/>
                  <Form.Field>
                      <label>Date Of Birth</label>
                      <input type='date' placeholder='Date of Birth' ref='dob' onChange={this.handleinputdob} value={this.state.dob}/>
                    </Form.Field>{/*End of form.field dob*/}
                  <br/>
                  <label><b>Gender</b></label>
                  <br/>
                  <Grid id='userprofile-radio'>
                    <Grid.Row>
                  <Form.Group inline>
                  <Form.Field>
                    <Radio
                      label='Male'
                      name='radioGroup'
                      value='male'
                      checked={this.state.gender === 'male'}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label='Female'
                      name='radioGroup'
                      value='female'
                      checked={this.state.gender === 'female'}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Form.Group>{/*End of form.group gender*/}
              </Grid.Row>
            </Grid>
                <br/>
                <Form.Group inline>
                  <Form.Field>
                  <Link to='/user'>
                    <Button basic>
                      CANCEL
                    </Button>
                  </Link>{/*Button link to user profile without any change*/}
                </Form.Field>
                  <Form.Field>
                    <Link to='/user'>
                      <Button
                        color='orange'
                        basic
                        onClick={this.updateUser}
                        disabled={this.state.disable}>
                        SAVE
                      </Button>
                    </Link>{/*Button link to user profile after update*/}
                  </Form.Field>
                </Form.Group>{/*End of form.group buttons*/}
              </Form>{/*End of form*/}
            </Segment>{/*End of segment*/}
          </Grid.Column>{/*End of grid.column*/}
        </Grid.Row>{/*End of grid.row*/}
      </Grid>{/*End of grid*/}
    </div>
      <div ref='snackbar' id='snackbar'>
        Password updated successfully

      </div>

      </div>

    )
  }
}
