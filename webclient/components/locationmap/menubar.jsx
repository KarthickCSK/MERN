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
      profilevalidate: true
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
          fixed="top"
          borderless
          className='menu-bar-container'
          >
           <Menu.Item onClick={this.handleItemClick}>
              <Icon name='content' onClick={this.handleToggle}/>
           </Menu.Item>
          <Menu.Item
            name='OWL'
            active={this.state.activeItem === 'Usename'}
            id='menubar-logo'/>
        </Menu>
        <Drawer docked={false}
          width={190}
         open={this.state.open}
         onRequestChange={(open) => this.setState({open})}
        >
           <Menu vertical fluid style={{marginTop:'60px'}}>
            <Menu.Item name='home' id='menubar-item'>
              <div className='menu-item-container'>
                <Icon name='home' size='big' fitted id='menubar-icon'/>
                <Link to='/vendorhome' onClick={this.handleToggle} id='menubar-link'>Home</Link>
              </div>
            </Menu.Item>
            <Menu.Item name='viewProfile' id='menubar-item'>
            <div className='menu-item-container'>
            <Icon name='user' size='big' fitted id='menubar-icon'/>
              <Link
                to='/user'
                onClick={this.handleToggle}
                id='menubar-link'>
                View profile
              </Link>
            </div>
            </Menu.Item>
            <Menu.Item name='addProduct' id='menubar-item'>
            <div className='menu-item-container'>
              <Icon name='add to cart' size='big' fitted id='menubar-icon'/>
              <Link
                to='/vendor'
                onClick={this.handleToggle}
                id='menubar-link'>
                Add Product
              </Link>
            </div>
            </Menu.Item>
            <Menu.Item name='addShop' id='menubar-item'>
            <div className='menu-item-container'>
              <Icon name='add square' size='big' fitted id='menubar-icon'/>
              <Link
                to='/addshop'
                onClick={this.handleToggle}
                id='menubar-link'>
                Add Shop
              </Link>
            </div>
            </Menu.Item>
            <Menu.Item name='viewShops' id='menubar-item'>
            <div className='menu-item-container'>
              <Icon name='eye' size='big' fitted id='menubar-icon'/>
              <Link
                to='viewshop'
                id='menubar-link'
                onClick={this.handleToggle}
              >
                View Shops
              </Link>
            </div>
            </Menu.Item>
            <Menu.Item name='logout' id='menubar-item'>
            <div className='menu-item-container'>
              <Icon name='sign out' size='big' fitted id='menubar-icon'/>
              <Link
                to='/a'
                onClick={this.logout}
                id='menubar-link'>
                Logout
              </Link>
            </div>
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
          fixed="top"
          className='menu-bar-container'
          >
           <Menu.Item onClick={this.handleItemClick}>
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
            <div className='menu-item-container'>
              <Icon name='home' size='big' fitted id='menubar-icon'/>
              <Link to='/home' onClick={this.handleToggle} id='menubar-link'>Home</Link>
            </div>
            </Menu.Item>
            <Menu.Item name='viewProfile' id='menubar-item'>
            <div className='menu-item-container'>
              <Icon name='user' size='big' fitted id='menubar-icon'/>
              <Link
                to='/user'
                onClick={this.handleToggle}
                id='menubar-link'>
                View profile
              </Link>
            </div>
            </Menu.Item>
            <Menu.Item name='wishlist' id='menubar-item'>
            <div className='menu-item-container'>
              <Icon name='heart' size='big' fitted id='menubar-icon'/>
              <Link
                to='/wishlist'
                onClick={this.handleToggle}
                id='menubar-link'>
                My Wishlist
              </Link>
            </div>
            </Menu.Item>
            <Menu.Item name='logout' id='menubar-item'>
            <div className='menu-item-container'>
              <Icon name='sign out' size='big' fitted id='menubar-icon'/>
              <Link
                to='/a'
                onClick={this.logout}
                id='menubar-link'>
                Logout
              </Link>
            </div>
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
