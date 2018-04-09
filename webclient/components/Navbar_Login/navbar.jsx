import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import {deepOrange500} from 'material-ui/styles/colors';
import {Link, hashHistory} from 'react-router';
import Image  from 'semantic-ui-react';
import FlatButton from 'material-ui/FlatButton';
const styles = {
  'fontFamily': '\'Julius Sans One\', sans-serif',
  'fontWeight': '700','textTransform': 'uppercase','backgroundColor':deepOrange500,

}

export default class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleSignout = () => {
    this.setState({open: false});
    const path = '/';
    hashHistory.push(path);
    
  }
  handleProfileView = () => {
      this.setState({open: false});
      const path = '/vendorprofile';
      hashHistory.push(path);
  }
  handleAddShopView = () => {
      this.setState({open: false});
      const path = '/addShop';
      hashHistory.push(path);
  }
  handleAddProductView = () => {
      this.setState({open: false});
      const path = '/addProduct';
      hashHistory.push(path);
  }


  render() {
    return (
      <div>
        <AppBar
          title={<span><img src="../../Logo/LogoSeller.svg" style={{"width":200,"height":80,'paddingBottom':15}} /></span>}
          style={{backgroundColor:deepOrange500}}
          onTitleTouchTap={this.handleSignout}
          onLeftIconButtonTouchTap={this.handleToggle}
          iconClassNameRight="muidocs-icon-navigation-expand-more">
        </AppBar>
        <Drawer
          containerStyle={styles}
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}>
          <MenuItem onTouchTap={this.handleProfileView} style={styles} >Profile</MenuItem>
          <MenuItem onTouchTap={this.handleAddShopView} style={styles} >Add Shop</MenuItem>
          <MenuItem onTouchTap={this.handleAddProductView} style={styles} >Add Product</MenuItem>
          <MenuItem onTouchTap={this.handleSignout} style={styles}>Sign Out</MenuItem>
        </Drawer>
      </div>
    );
  }
}