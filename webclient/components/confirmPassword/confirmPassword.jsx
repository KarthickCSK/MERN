import React from 'react'
import {
 Segment,
 Divider,
 Input,
 Grid,
 Icon,
 Button,
 Image,
 Card,
   Popup,Modal,Header
} from 'semantic-ui-react'
import Snackbar from 'material-ui/Snackbar';
import {hashHistory} from 'react-router'
import validator from 'validator'
import './confirmPassword.css'
var currentPath,currentParams;
export default class ConfirmPassword extends React.Component {
 constructor() {
   super();
   this.state = {
    password: "",
    passwordError: false,
    password: "",
    repassword: "",
    errorpassword: false,
    errorrepassword: false,
    openSnackBar:false,
    snackbarMsg:"",
   }
 }

 handlePassword(event){
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
 handleRepassword(event) {
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
ChangePassword(){
  if(!this.state.passwordError&&this.state.password.length){
    $.ajax({
      url: '/fPassword/updatepassword',
      type:"POST",
      data:{pass:this.state.password,id:this.props.location.query.id,mail:this.props.location.query.email},
      success:function(msg)
      {
      if(msg){
        hashHistory.push('/login?msg=Password updated')
      }else{
        hashHistory.push('/login?msg=link Expired')
      }
      }.bind(this),
      error:function(err)
      {
      console.log(err);
      }
    });
  }else{
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
 let that = this.state.message;
   return (
    <div className="NewPasswordView">
    <Modal className="NewPasswordModal" dimmer='true' size='small' open={open} onClose={this.close} closeIcon='close'>
          <Modal.Content>
          <Header id="confirm_h3" as='h3' textAlign='center'>Enter New Password</Header>
            <Modal.Description className="NewPasswordDescri">
            <label id="Confirm_PasswordField">New Password </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Input type="password" name = "pwd" id = "pwd" onChange={this.handlePassword.bind(this)} required/>
        <p id="reg-error">{this.state.errormessagepassword}</p>
            <label id="Confirm_PasswordField">Confirm Password </label> &nbsp;&nbsp;&nbsp;&nbsp;
<Input error={this.state.passwordError} type="password" id="password" onChange={this.handleRepassword.bind(this)} required/>
  <p id="reg-error">{this.state.errormessage}</p>
            <center className='new-pass-btn-container'>
              <Button id="btn-new-password" animated='fade' className='new-pass-btn' onClick={this.ChangePassword.bind(this)}>
                <Button.Content visible className='new-pass-btn-text'>
                  Update Password
                </Button.Content>
                <Button.Content hidden className='new-pass-btn-text'>
                <Icon name='refresh' />
                </Button.Content>
              </Button>
            </center>
            </Modal.Description>
          </Modal.Content>
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
