import React, { Component } from 'react';
import {Menu, Icon, Sidebar, Segment, Button, Image, Header} from 'semantic-ui-react';
import './menubar.css';
import {AppBar, Drawer, MenuItem} from 'material-ui';
import Footer from '../../components/aboutUs/Footer.jsx';
import {Link, hashHistory} from 'react-router';
import Cookie from 'react-cookie';
export default class MenuExampleInverted extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      activeItem: 'Username',
      visible: false,
      open: false,
      profilevalidate:true
    };
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  componentDidMount()
{
  if(Cookie.load("authType")=='facebook'||Cookie.load("authType")=='google')
    {
      this.setState({profilevalidate:false})
    }
    else if(Cookie.load("userType")=='Vendor'){
      this.setState({profilevalidate:true})
    }
    else if(Cookie.load("userType")=='Customer'){
      this.setState({profilevalidate:false})
    }
}
  logout()
 {
    $.ajax({
      url: '/auth/logout',
      type: 'GET',
      dataType: 'text',
      success: function(response)
      {
    Cookie.remove('token');
  hashHistory.push('/');
    }.bind(this),
error: function(err) {
console.log(err);
hashHistory.push('/');
}
});
}
  handleItemClick = (e, { name }) =>
{
  this.setState({ activeItem: name });
}

toggleVisibility = () =>
{
  this.setState({ visible: !this.state.visible });
}
handleToggle = () => this.setState({open: !this.state.open});
render()
{
  return (
      <div>
      {this.state.profilevalidate ?
        <div>
        <Menu id='bar'
          inverted
          fixed
          color= 'orange'
          >
           <Menu.Item>
              <Icon name='content' onClick={this.handleToggle}/>
           </Menu.Item>
          <Menu.Item
            name='OWL'
            active={this.state.activeItem === 'Usename'}
            onClick={this.handleItemClick}
            id='menubar-logo'/>
        </Menu>


        <Drawer docked={false}
          width={190}
         open={this.state.open}
         onRequestChange={(open) => this.setState({open})}
        >
           <Menu vertical fluid style={{marginTop:'60px'}}>
            <Menu.Item name='home' id='menubar-item'>

              <Link to='/home' onClick={this.handleToggle} id='menubar-link'><Icon name='home' size='big' fitted color='orange' id='menubar-icon'/>Home</Link>
            </Menu.Item>
            <Menu.Item name='viewProfile' id='menubar-item'>
              <Link
                to='/user'
                onClick={this.handleToggle}
                id='menubar-link'><Icon name='user' size='big' fitted color='orange' id='menubar-icon'/>
                View profile
              </Link>
            </Menu.Item>
            <Menu.Item name='addProduct' id='menubar-item'>
              <Link
                to='/vendor'
                onClick={this.handleToggle}
                id='menubar-link'><Icon name='add to cart' size='big' fitted color='orange' id='menubar-icon'/>
                Add Product
              </Link>
            </Menu.Item>
            <Menu.Item name='addShop' id='menubar-item'>
              <Link
                to='/addshop'
                onClick={this.handleToggle}
                id='menubar-link'><Icon name='add square' size='big' fitted color='orange' id='menubar-icon'/>
                Add Shop
              </Link>
            </Menu.Item>
            <Menu.Item name='viewShops' id='menubar-item'>
              <Link
                to='viewshop'
                onClick={this.handleToggle}
                id='menubar-link'><Icon name='eye' size='big' fitted color='orange' id='menubar-icon'/>
                View Shops
              </Link>
            </Menu.Item>
            <Menu.Item name='logout' id='menubar-item'>
            <Link
              onClick={this.logout}
              id='menubar-link'><Icon name='sign out' size='big' fitted color='orange' id='menubar-icon'/>
              Logout
            </Link>
           </Menu.Item>
         </Menu>
         </Drawer>
         <Sidebar.Pushable as={Segment} id='menubar-pushable'>
          <Sidebar.Pusher id='menubar-pusher'>
              {this.props.children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <Footer/>
        </div>
        :
        <div>
        <Menu id='bar'
          inverted
          fixed
          color= 'orange'
          >
           <Menu.Item>
              <Icon name='content' onClick={this.handleToggle}/>
           </Menu.Item>
          <Menu.Item
            name='OWL'
            active={this.state.activeItem === 'Usename'}
            onClick={this.handleItemClick}
            id='menubar-logo'/>
        </Menu>


        <Drawer docked={false}
          width={190}
         open={this.state.open}
         onRequestChange={(open) => this.setState({open})}
         >
           <Menu vertical fluid style={{marginTop:'60px'}}>
            <Menu.Item name='home' id='menubar-item'>

              <Link to='/home' onClick={this.handleToggle} id='menubar-link'><Icon name='home' size='big' fitted color='orange' id='menubar-icon'/>Home</Link>
            </Menu.Item>
            <Menu.Item name='viewProfile' id='menubar-item'>
              <Link
                to='/user'
                onClick={this.handleToggle}
                id='menubar-link'><Icon name='user' size='big' fitted color='orange' id='menubar-icon'/>
                View profile
              </Link>
            </Menu.Item>
            <Menu.Item name='filter-product' id='menubar-item'>
              <Link
                to='/filter'
                onClick={this.handleToggle}
                id='menubar-link'><Icon name='filter' size='big' fitted color='orange' id='menubar-icon'/>
                Filter Products
              </Link>
            </Menu.Item>
            <Menu.Item name='wishlist' id='menubar-item'>
              <Link
                to='/wishlist'
                onClick={this.handleToggle}
                id='menubar-link'><Icon name='heart' size='big' fitted color='orange' id='menubar-icon'/>
                My Wishlist
              </Link>
            </Menu.Item>
            <Menu.Item name='logout' id='menubar-item'>
            <Link
              onClick={this.logout}
              id='menubar-link'><Icon name='sign out' size='big' fitted color='orange' id='menubar-icon'/>
              Logout
            </Link>
           </Menu.Item>
         </Menu>
         </Drawer>
         <Sidebar.Pushable as={Segment} id='menubar-pushable'>
          <Sidebar.Pusher id='menubar-pusher'>
              {this.props.children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <Footer/></div>
      }
        </div>
    );
  }
}
