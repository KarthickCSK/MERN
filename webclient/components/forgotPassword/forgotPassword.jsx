import React from 'react'
import {
  Segment,
  Divider,
  Input,
  Grid,
  Icon,
  Button,
  Image,
  Message,
  Modal,
  Sidebar,
  Menu,
  Header,
} from 'semantic-ui-react'
import Snackbar from 'material-ui/Snackbar';
import {hashHistory} from 'react-router'
import validator from 'validator';
import './forgotPassword.css'
export default class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      openModal:true,
      errormail: false,
      errormessageemail: "",
      message: true,
      open: false,
      valid:false,
      openSnackBar:false,
      snackbarMsg:""
    }
  }
  Emailpattern(event) {
    if (validator.isEmail(event.target.value)) {
      $.ajax({
      url:"/users/checkMail",
      type:"POST",
      data:{mail:event.target.value},
      success:function(msg)
      {
      if(msg){
        this.setState({errormail: false});
          this.setState({errormessageemail:false})
      }
      else{
          this.setState({valid:msg})
        this.setState({errormail: true});
        this.setState({errormessageemail:"Enter Registered mailID"})
        }
      }.bind(this),
      error:function(err)
      {
        this.setState({valid:false})
        console.log(err);
      }.bind(this)
      });
      this.setState({errormail: false});
      this.setState({errormessageemail: false, email: event.target.value});
    } else {
      this.setState({errormail: true});
      this.setState({errormessageemail: 'Enter your full email address, including the \@\ '});
    }
  }
  close = () => {
    this.setState({open: false})
    hashHistory.push('/');
  }
  confirmPassword(event) {
    this.setState({email: event.target.value, message: false});
  }
  handlePassword = () => {
    if(!this.state.errormail&&this.state.email.length)
    {
      console.log(this.state.errormail+this.state.email);
      $.ajax({
    url:"/fPassword/forgetPassword",
    type:"POST",
    data:{email:this.state.email},
    success:function(msg)
    {
    console.log("successfully sent");
    }.bind(this),
    error:function(err)
    {
    alert(err+"check the details"+Object.keys(value.formData.Email));
    }
    });
      this.setState({open:true})
    console.log(this.state.email);
    }
    else{
      this.setState({openSnackBar:true,snackbarMsg:"Check the details"});
    }
  }
  handleRequestClose = () => {
      this.setState({
        openSnackBar: false,
      });
    };
    close = () => {this.setState({ openModal: false })
  hashHistory.push('/');
}
  render() {
    return (
      <div className="ForgotpasswordView">
        <Modal className="ForgotpasswordModal" dimmer='true' size='small' open={this.state.openModal} onClose={this.close}>
          <Modal.Content>
          <Header id="forgot_h3" as='h3' textAlign='center'>Forgot Password</Header>
            <Modal.Description className="ForgotpasswordModal">
                <center>
                  <Icon color="red" id="forgot_icon" name="unlock alternate" size="huge"/>
                </center><br/>
                <label id="forgot_label">Enter your email address below and we will send a secure link to reset your password.</label>
                <br/>
                <Input fluid error={this.state.errormail} name="email" placeholder='Email' onChange={this.Emailpattern.bind(this)} required>
                  <input/>
                </Input>
                <p id="forgot_error">{this.state.errormessageemail}</p>
                <br/>
                <center className='forgot-pass-btn-container'>
                  <Button animated='fade' className='forgot-pass-btn' onClick={this.handlePassword.bind(this)} >
                        <Button.Content visible className='forgot-pass-btn-text'>
                       Send Link
                        </Button.Content>
                        <Button.Content hidden className='forgot-pass-btn-text'>
                        <Icon name='send outline' />
                        </Button.Content>
                      </Button>
                </center>
                </Modal.Description>
          </Modal.Content>
        </Modal>
                <Modal size='small' dimmer='blurring' open={this.state.open} onClose={this.close}>
                  <Modal.Description>
                    <center>
                      <Modal.Header>
                        <Icon color="orange" name="check" size="huge"/>
                      </Modal.Header>
                      <Divider/>
                      <h3>We just send a email to &nbsp;
                        <b>{this.state.email}</b>
                      </h3>
                        <h4>
                        <label id="footer_label">
                          Check the secure link we send you to reset your password. If you didnt receive an email, check your Spam folder
                        </label>
                      </h4>
                      <Button color='orange' content="Okay" onClick={this.close}/>
                      <br/>
                      <br />
                      <br />
                    </center>
                  </Modal.Description>
                </Modal>
        <Snackbar
            open={this.state.openSnackBar}
            message={this.state.snackbarMsg}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}/>
      </div>
    );
  }
}
