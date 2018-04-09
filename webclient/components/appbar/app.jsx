import React, {Component} from 'react';
import {Link} from 'react-router';
import {
    Sidebar,
    Segment,
    Button,
    Menu,
    Image,
    Icon,
    Header,
    Container,
    List,
    Grid
} from 'semantic-ui-react'



var header_icon={
    display: 'inline',
    float: 'left'
}

var header_title={
    marginRight: '2%',
    marginLeft: '30px',
    paddingLeft: '-4px',
}

var sidebar_pusher={
  height:'1000px'
}

var segmentgroup={
  border: 'black'
}

export default class ApplicationBar extends Component {
  constructor(props) {
    super(props);
  }
    state = {
        visible: false
    }

    toggleVisibility = () => this.setState({
        visible: !this.state.visible
    })

    closeVisibility = () => this.setState({
      visible: false
    })
    handleItemClick = (e, {name}) => this.setState({activeItem: name})

    render() {
        const {visible} = this.state
        return (
            <div>
              <Grid>
                 <Grid.Row>
                    <Grid.Column  width={16}>

                        <Segment inverted color='black' size='large'>
                            <Header as='h2' textAlign='left'><Image shape='circular' src='https://t4.ftcdn.net/jpg/01/15/17/73/240_F_115177311_v8OndD35w9jLLnxAQUEDr0LvSRaItWNf.jpg' style={header_title}/>OWL
			                         <Icon onClick={this.toggleVisibility} name='sidebar' style={header_icon}></Icon>
                                <Segment.Group horizontal size='mini' style={segmentgroup}>
                                  <Segment inverted color='black' textAlign='right'>Electronics<Icon name='caret down'></Icon></Segment>
                                  <Segment inverted color='black' textAlign='right'>Appliances<Icon name='caret down'></Icon></Segment>
                                  <Segment inverted color='black' textAlign='right'>Lifestyle<Icon name='caret down'></Icon></Segment>
                                  <Segment inverted color='black' textAlign='right'>Home & Living<Icon name='caret down'></Icon></Segment>
                                  <Segment inverted color='black' textAlign='right'>Automotive<Icon name='caret down'></Icon></Segment>
                                  <Segment inverted color='black' textAlign='right'>Books & Station<Icon name='caret down'></Icon></Segment>
                                </Segment.Group>
                            </Header>
                        </Segment>


                  </Grid.Column>
                   </Grid.Row>
                  </Grid>


                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted>
                        <Menu.Item as={Link} to='/home' name='home' onClick={this.handleClose}>
                            <Icon name='home'/>
                            Home
                        </Menu.Item>
                        <Menu.Item as={Link} to='/home' name='Update Profile' onClick={this.handleItemClick}>
                            <Icon name='edit'/>
                            Update Profile
                        </Menu.Item>
                        <Menu.Item name='Wishlist' onClick={this.handleItemClick} active={false}>
                            <Icon name='heart'/>
                            Wishlist
                        </Menu.Item>
                        <Menu.Item as={Link} to='/home' name='Update Catalogue' onClick={this.handleItemClick}>
                            <Icon name='plus square'/>
                            Update Catalogue
                        </Menu.Item>
                        <Menu.Item as={Link} to='/home' name='Sign Out' onClick={this.handleItemClick}>
                            <Icon name='sign out'/>
                            Sign Out
                        </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher style={sidebar_pusher} onClick={this.closeVisibility}>
                        <Segment basic >

                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
              </div>
        )
    }
}
