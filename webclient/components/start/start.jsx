import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import {deepOrange500} from 'material-ui/styles/colors';
import {Link, hashHistory} from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import {Segment,Container, Input, Popup, Button, Checkbox, Form, Icon, Message, Grid, Image,List,Header,Card,Divider } from 'semantic-ui-react';
import './start.css';
const styles = {
  'fontFamily': '"Lato","Avenir Next",Arial,sans-serif',
  'fontWeight': '700','textTransform': 'uppercase','backgroundColor':deepOrange500,

}



export default class StartPage extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      userName:'',
      open:false,
      openSnack:false,
      snackbarMsg:"",
    };
  }
openSnackmsg=()=>{
    if(Object.keys(this.props.location.query).length==1)
    {
      this.setState({openSnack:true,snackbarMsg:this.props.location.query.msg},()=>{console.log(this.state.openSnack+this.state.snackbarMsg)});
    }else{
      this.setState({openSnack:false,snackbarMsg:''});
    }
}
componentDidMount(){
    if(this.props.msg)
    {
      this.setState({openSnack:true,snackbarMsg:this.props.msg});
    }else{
      this.setState({openSnack:false,snackbarMsg:''});
    }
  }
  
handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
          <video playsInline autoPlay muted loop className="video">
            <source src="50-Percent-Off.mp4" type="video/mp4"/>
            <source src="50-Percent-Off.ogg" type="video"/>
            Your browser does not support the video tag. I suggest you upgrade your browser.
          </video>
        <header className="start_header">
          <nav className="start_nav">
            <Grid columns='equal'>
              <Grid.Row>
                <Grid.Column className="animated slideInLeft" textAlign='left' width={2} computer={2}>
                  <a href="/#/"><Image id="start_logo" src='Logo/fullLogoOrang.svg' size='tiny' verticalAlign='middle' /></a>
                </Grid.Column>
                <Grid.Column className="animated slideInLeft" textAlign='left' width={8} computer={8}>
                  <h1 className='start-logo-text'>OWL</h1>
                </Grid.Column>
                <Grid.Column className="animated slideInDown" textAlign='right' only={'computer'}>
                  <a href="/#/login"><Button inverted style={{'color':'white'}}>LOGIN</Button></a>
                </Grid.Column>
                <Grid.Column className="animated slideInRight" textAlign='left' only={'computer'}>
                  <a href="/#/signup"><Button inverted style={{'color':'white'}}>SIGNUP</Button></a>
                </Grid.Column>
                <Grid.Column width={2} only='mobile'>
                  <a href="/#/login"><Icon name='sign in'/></a>
                </Grid.Column>
                <Grid.Column width={2} only='mobile'>
                  <a href="/#/signup"><Icon name='signup'/></a>
                </Grid.Column>


              </Grid.Row>
            </Grid>
          </nav>
        </header>
        <Snackbar
            open={this.state.openSnack}
            message={this.state.snackbarMsg}
            autoHideDuration={5000}
            onRequestClose={this.handleRequestClose}
            />
      </div>
    );
  }
}
