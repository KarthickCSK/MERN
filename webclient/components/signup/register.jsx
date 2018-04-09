import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import {hashHistory} from 'react-router';
import DatePicker from 'material-ui/DatePicker';
import MainComponent from '../../clientapp.jsx';
import About from '../aboutUs'
import {
  Input,
  Popup,
  Form,
  TextArea,
  Grid,
  Button,
  Checkbox,
  Icon,
  Message,Dimmer,Loader,
  Divider,Modal,Header
} from 'semantic-ui-react';
import validator from 'validator';
import './register.css'
const options = [
  { text: 'Male', value: 'male' },
  { text: 'Female', value: 'female' },
]
const minDate = new Date();
    const maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 60);
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear() -16);
    maxDate.setHours(0, 0, 0, 0);
export default class Register extends React.Component {
  state = {
    checked: false,
    open:false,
    openModal:true,
    snackbarMsg:"",
    Name: "",
    username: "",
    email: "",
    password: "",
    repassword: "",
    dob:"",
    errorphone: false,
errormessagephone:"",
    phonenumber:"",
    errorFirstName: false,
    errorLastName: false,
    erroremail: false,
    errorusername: false,
    errorpassword: false,
    errorrepassword: false,
    errormessageName:"",
    errormessageuser:"",
    errormessageemail:"",
    errormessagepassword:"",
    errormessage: "",
    CustomerType:"",
    minDate: minDate,
    maxDate: maxDate,
  }
  ChangeFirstName = (event) => {
    this.setState({Name: event.target.value});
    if(event.target.value.trim)
    if (validator.isAlpha(event.target.value)) {
      this.setState({errorFirstName: false});
        this.setState({errormessageName: false});
    } else {
      this.setState({errorFirstName: true});
        this.setState({errormessageName:'Enter a valid name'});
    }
  }
  ChangeLastName = (event) => {
    if (validator.isAlpha(event.target.value)) {
      this.setState({errorLastName: false});
        this.setState({errormessageName: false});
    } else {
      this.setState({errorLastName: true});
        this.setState({errormessageName:'Enter a valid name'});
    }
  }
  ChangeEmail = (event) => {
    this.setState({email: event.target.value});
    if (validator.isEmail(event.target.value)) {
      this.checkMail(event.target.value);
      this.setState({erroremail: false});
        this.setState({errormessageemail: false});
    } else {
      this.setState({erroremail: true});
        this.setState({errormessageemail:'Enter full email address, including the \@\ '});
    }
  }
  checkMail=(mail)=>{
      $.ajax({
      url:"/users/checkMail",
      type:"POST",
      data:{mail:mail},
      success:function(msg)
      {
      if(msg)
        { this.setState({erroremail: true});
          this.setState({errormessageemail:"Already Taken"})
        }else{
          this.setState({erroremail: false});
          this.setState({errormessageemail:false})
        }
      }.bind(this),
      error:function(err)
      {
      console.log(err);
      }
      });
  }
  ChangePhone= (event) => {
    this.setState({email: event.target.value});
    if ((validator.isNumeric(event.target.value))){
      this.setState({errorphone: false});
        this.setState({errormessagephone: false});
    if (validator.isLength((event.target.value), 10,10)){
      this.setState({errorphone: false});
        this.setState({errormessagephone: false});
      }
     else {
      this.setState({errorphone: true});
        this.setState({errormessagephone:'Should be 10 digits'});
    }
  } else {
    this.setState({errorphone: true});
      this.setState({errormessagephone:'Should contains Number only'});
  }
}
  ChangePassword(event) {
     this.setState({password: event.target.value});
     var password = event.target.value;
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
     var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
           if (event.target.value.length >= 6 && strongRegex.test(password) || mediumRegex.test(password)) {
               this.setState({errorpassword: false});
               this.setState({errormessagepassword: false});
           } else {
               this.setState({errorpassword: true});
               this.setState({errormessagepassword: 'Password should contain numbers,letters(A&a) and minimum length 6'});
           }
}
  ChangeRepassword = (event) => {
if(event.target.value.length >3){
    this.setState({repassword: event.target.value});
    if (validator.equals(event.target.value, this.state.password)) {
      this.setState({errorrepassword: false});
      this.setState({errormessage:""})
    } else {
      this.setState({errorrepassword: true});
      this.setState({errormessage:'Pls enter correct password'});
    }
  }
}
  handleMailer(e){
    console.log(e);
    $.ajax({
    url:"/aVerification/mailVerify",
    type:"POST",
    data:{data:e},
    success:function(msg)
    {
      this.setState({openLoader:false,mailSuccessRedirect:true,mailSuccessRedirectmsg:msg})
    }.bind(this),
    error:function(err)
    {
    console.log(err+"check the details mailer");
    }
    });
  }
  handleSignup = (e, value) => {
       e.preventDefault()
       let count = 0;

       if (value.formData.FirstName != '') {
           count += 1;
       } else {
           this.setState({errorFirstName: true, errormessageFName: 'Enter both Firstame & LastName'});

       }
       if (value.formData.LastName != '') {
           count += 1;
       } else {
           this.setState({errorLastName: true, errormessageName: 'Enter both Firstame & LastName'});

       }
       if (value.formData.username != '') {
           count += 1;
       } else {
           this.setState({errorusername: true, errormessageuser: 'Enter username '});

       }
       if (value.formData.email != '') {
           count += 1;
       } else {

           this.setState({erroremail: true, errormessageemail: 'Enter email '});
       }
       if (value.formData.dob != '') {
           count += 1;
       } else {

           this.setState({errordob: true, errormessagedob: 'Enter date of birth '});

       }
       if (value.formData.phonenumber != '') {
           count += 1;
       } else {

           this.setState({errorphone: true, errormessagephone: 'Enter phonenumber '});

       }
       if (value.formData.pwd != '') {
           count += 1;
       } else {

           this.setState({errorpassword: true, errormessagepassword: 'Enter  correct password '});

       }
       if (value.formData.Confirmpassword != '') {
           count += 1;
       } else {

           this.setState({errorrepassword: true, errormessage: 'Enter password '});

       }
       if (count==8) {
           {
               this.handleOpen(e, value)
           };
       }
   }

   handleOpen(e, value) {
       e.preventDefault()
       let customer;
       let that = this.state;
       if (!that.errorFirstName && !that.erroremail && !that.errorusername && !that.errorpassword && !that.errorrepassword) {
           console.log(value.formData.userType);
           if (value.formData.userType === true) {
               value.formData.userType = "Vendor";
               console.log(value.formData.userType);
           } else {
               value.formData.userType = "Customer";
               console.log(value.formData.userType);
           }
           $.ajax({
               url: "/auth/signup",
               type: "POST",
               data: value.formData,
               success: function(msg) {
                   this.setState({openLoader: true})
                  this.handleMailer(value.formData.username);
               }.bind(this),
               error: function(err) {
                   this.setState({open: true, snackbarMsg: err})
               }
           });
           
           console.log(value.formData);
       } else {
           this.setState({open: true, snackbarMsg: "Check all the details"})
       }
   }
  checkUsername(e){
    this.setState({username: event.target.value});
    if(e.target.value.length>=4){
      $.ajax({
      url:"/users/checkUsername",
      type:"POST",
      data:{username:e.target.value},
      success:function(msg)
      {
      if(msg)
        { this.setState({errorusername: true});
          this.setState({errormessageuser:"Already Taken"})
        }else{
          this.setState({errorusername: false});
          this.setState({errormessageuser:false})
        }
      }.bind(this),
      error:function(err)
      {
      console.log(err);
      }
      });
    }else{
      this.setState({errorusername: true});
          this.setState({errormessageuser:"use min 4 character"})
    }
  }
  toggleCheckBox = () => {
    this.setState({checked: !this.state.checked});
  }
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
  close = () => {this.setState({ openModal: false })
hashHistory.push('/');
}
datePicker(x,event){
  this.setState({
    dob:JSON.stringify(event)
  }, () => {
    console.log(this.state.dob +":"+JSON.stringify(event));
  })
}
  render()
  {
    let that = this.state.message;
    return (

      <div>
        {this.state.mailSuccessRedirect?<div><MainComponent msg={this.state.mailSuccessRedirectmsg}/><About/></div>:<div className="RegisterView">
        <Modal className="RegisterModal"  size='small' open={true} onClose={this.close} closeIcon='close'>
          <Modal.Content>
          <Header id="h3" as='h3' className='register_header'>REGISTER</Header>
            <Modal.Description className="RegisterDescription">
              <Form className='attached fluid segment' onSubmit={this.handleSignup.bind(this)} size='small' style={{'fontSize':17}}>
                <Form.Group widths='equal'>
                  <Form.Input name='FirstName' placeholder='*First Name' type='text' onChange={this.ChangeFirstName} error={this.state.errorFirstName} />
                  <Form.Input name='LastName' defaultValue='' placeholder='Last Name' type='text' onChange={this.ChangeLastName} error={this.state.errorLastName}/>
                </Form.Group>
                <p id="reg-error">{this.state.errormessageName}</p>
                <Form.Input name='username' placeholder='*Username' type='text' onChange={this.checkUsername.bind(this)} error={this.state.errorusername} />
                  <p id="reg-error">{this.state.errormessageuser}</p>
                <Form.Group widths='equal'>
                <Form.Input name='email' placeholder='*EmailID' type='text' onChange={this.ChangeEmail} error={this.state.erroremail} />
                  <Form.Input name='dob' type='text' >
                    <DatePicker hintText="*DOB"
                      name= "dob"
                      container="inline"
                      mode="landscape"
                      autoOk={true}
                      minDate={this.state.minDate}
                      maxDate={this.state.maxDate}
                      onChange={this.datePicker.bind(this)}/>
                  </Form.Input>
                </Form.Group>
                <p id="reg-error">{this.state.errormessageemail}</p>
                <Form.Group widths='equal'>
                  <Form.Input name='phonenumber' placeholder='*Contact No.' type='text' onChange={this.ChangePhone} error={this.state.errorphone} />
                  <Form.Select name="Gender" options={options} placeholder='*Gender' />
                </Form.Group>
                  <p id="reg-error">{this.state.errormessagephone}</p>
                <Form.Input  name = "pwd" id = "pwd" type='password' placeholder="*Password"  onChange={this.ChangePassword.bind(this)} error={this.state.errorpassword} />
                  <p id="reg-error">{this.state.errormessagepassword}</p>
                <Form.Input name='Confirmpassword' type='password'  placeholder="*Confirm Password" onChange={this.ChangeRepassword} error={this.state.errorrepassword} />
                  <p id="reg-error">{this.state.errormessage}</p>
                <Form.Checkbox name='userType' inline label='Are you a vendor?'
                  onChange={this.toggleCheckBox}
                  checked={this.state.checked}
                />
                  <div className='register-btn-container'>
                    <Button animated='fade' className='register-btn'>
                      <Button.Content visible className='register-btn-text'>
                        Register
                      </Button.Content>
                      <Button.Content hidden className='register-btn-text'>
                      <Icon name='sign in' />
                      </Button.Content>
                    </Button>
                  </div>
                </Form>
            </Modal.Description>
          </Modal.Content>
          {this.state.openLoader?

        <Dimmer active>
          <Loader  size='big' content='We are sending verification link to your Mail..'/>
        </Dimmer>
        :null
        }
        </Modal>

        <Snackbar
          open={this.state.open}
          message={this.state.snackbarMsg}
          autoHideDuration={8000}
          onRequestClose={this.handleRequestClose}/>

      </div>}
        </div>
    );
  }
}
