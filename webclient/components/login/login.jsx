import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import { hashHistory, Link } from 'react-router';
import { Segment, Input, Button, Icon, Grid,Form,Header,Image,Modal,Message,Divider,Radio,Checkbox} from 'semantic-ui-react';
import './login.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      snackbarMsg: '',
      openModal: true,
      checked: false
    };
  }

  componentDidMount() {
    if(typeof this.props.location.query.msg=='undefined')
    {
      this.setState({open:false,snackbarMsg:'Welcome !'});
    }else
    {
      this.setState({open:true,snackbarMsg:this.props.location.query.msg});
    }
  }
  close = () => {this.setState({ openModal: false })
  hashHistory.push('/');
}
  handleLogin = (e, value) => {
    e.preventDefault()

    $.ajax({
    url:"/auth/login",
    type:"GET",
    data:value.formData,
    success:function(msg)
    {
    this.setState({open:true,snackbarMsg:msg});
    if(msg=='Customer'){
      hashHistory.push('/home')
    }
      if(msg=='Vendor'){
        hashHistory.push('/vendorhome')
      }
    }.bind(this),
    error:function(err)
    {
      console.log(err);
    this.setState({open:true,snackbarMsg:err.responseText});
    }.bind(this)
    });
  }
  handleRequestClose = () => {
      this.setState({
        open: false,
      });
    };
    toggleCheckBox = () => {
      this.setState({checked: !this.state.checked});
    }
  render() {
    return (
    <div className="LoginView">
      <Modal className="LoginModal"  size='small' open={this.state.openModal} onClose={this.close} closeIcon='close' >
          <Modal.Content>
            <Modal.Description className="LoginDescription">
              <Header className="login_header" as='h3'>LOGIN</Header>
              <Form className='attached fluid segment' onSubmit={this.handleLogin} size='small'  style={{'fontsize':18}}>
          <Form.Input name='username' placeholder='*Username' type='text'/>
          <Form.Input name='password' placeholder='*Password' type='password'/>
          <div>
            <a href='/#/forgotpassword' className='forgot-pass-text'>
              Forgot password ?
            </a>
            <Checkbox name='userType'  label= 'Are you a vendor?' className="login_vendor"
              onChange={this.toggleCheckBox}
              checked={this.state.checked}
            />
          </div>
          <div className='login-btn-container'>
            <Button animated='fade' className='login-btn'>
              <Button.Content visible className='login-btn-text'>
                Login
              </Button.Content>
              <Button.Content hidden className='login-btn-text'>
              <Icon name='sign in' />
              </Button.Content>
            </Button>
          </div>
          </Form>
<div className="login_social">
          {this.state.checked?null:<div><Divider horizontal>Or</Divider>
          <Grid columns='equal' centered>
            <Grid.Column width={16}>
              <a href='/auth/facebook'>
                <Button color='facebook' fluid>
                <Icon name='facebook' /> Facebook
                </Button>
              </a>
            </Grid.Column>
            <Grid.Column width={16}>
              <a href='/auth/google'>
                <Button color='google plus' fluid>
                <Icon name='google plus' /> Google Plus
                </Button>
              </a>
            </Grid.Column>
          </Grid></div>}
</div>
          </Modal.Description>
          </Modal.Content>
        </Modal>
      <Snackbar
            open={this.state.open}
            message={this.state.snackbarMsg}
            autoHideDuration={8000}
            onRequestClose={this.handleRequestClose}
            />
    </div>
    );
  }
}
