import React from 'react';
import {hashHistory} from 'react-router';
import {
    Header,
    Modal,
    Card,
    Grid,
    Button,
    Segment,
    Icon,
    Label,
    Image,
    Menu,
    Embed
} from 'semantic-ui-react'
export default class ShowRoomDetail2 extends React.Component
{
    constructor(props) {
        super(props);
        this.handleCart = this.handleCart.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.state = {
            open: false,
            count: 0
        };
    }
    handleModalOpen()
    {
        this.setState({open: true})
    }
    handleModalClose()
    {
        this.props.handleViewDetails(false);
    }
    handleCart()
    {
        let num = this.state.count;
        num++;
        this.setState({count: num})
    }

    handleProductWishlist = () => {
      hashHistory.push('/wishlist');
    }

    render() {
        const style = {
            heart: {
                float: 'right',
                count: 0,

            },
            modal: {},
            label: {
                marginBottom: '1%'
            },
            menu: {
              float: 'right'
            },
            header:
            {
              backgroundColor: 'grey',
              color: 'white'
            },

        }
        return (
            <div>
                <Modal style={style.modal} open={this.props.open} onClose={this.handleModalClose}>
                    {/* name of the shop as the header of the modal*/}
                    <Header style={style.header}>
                        Shop Name

                  <Menu compact style={style.menu}>
                            <Menu.Item as='a' onClick={this.handleProductWishlist}>
                                <Icon name='heart'/>Wishlist
                                   <Label color='red' floating>{this.state.count}</Label>
                            </Menu.Item>
                        </Menu>
                      </Header>
                    <Modal.Content>
                        <Grid >
                            <Grid.Row>
                                <Grid.Column>
                                    <Label as='a' color='red'   style={style.label} ribbon>80%</Label>
                                    <Card.Group itemsPerRow={4}>
                                        <Card raised color='red'>
                                            <Image src='http://semantic-ui.com/images/wireframe/square-image.png' size='medium'/>
                                            <Card.Content>
                                                <Header>
                                                    Product name</Header>
                                                <Card.Description>
                                                    lorem adasdako dkasjdopml ladlkaldo
                                                </Card.Description>
                                                <Icon style ={style.heart} circular name='heart' onClick={this.handleCart}/>
                                            </Card.Content>
                                        </Card>
                                        <Card raised color='red'>
                                            <Image src='http://semantic-ui.com/images/wireframe/square-image.png' size='medium'/>
                                            <Card.Content>
                                                <Header>
                                                    Product name</Header>
                                                <Card.Description>
                                                    lorem adasdako dkasjdopml ladlkaldo
                                                </Card.Description>
                                                <Icon style ={style.heart} circular name='heart' onClick={this.handleCart}/>
                                            </Card.Content>
                                        </Card>
                                        <Card raised color='red'>
                                            <Image src='http://semantic-ui.com/images/wireframe/square-image.png' size='medium'/>
                                            <Card.Content>
                                                <Header>
                                                    Product name</Header>
                                                <Card.Description>
                                                    lorem adasdako dkasjdopml ladlkaldo
                                                </Card.Description>
                                                <Icon style ={style.heart} circular name='heart' onClick={this.handleCart}/>

                                            </Card.Content>
                                        </Card>

                                        <Card raised color='red'>
                                            <Image src='http://semantic-ui.com/images/wireframe/square-image.png' size='medium'/>
                                            <Card.Content>
                                                <Header>
                                                    Product name</Header>
                                                <Card.Description>
                                                    lorem adasdako dkasjdopml ladlkaldo
                                                </Card.Description>
                                                <Icon style ={style.heart} circular name='heart' onClick={this.handleCart}/>

                                            </Card.Content>
                                        </Card>
                                    </Card.Group>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                        <Grid>
                            <Grid.Row>
                                <Grid.Column>
                                    <Label as='a' color='red' style={style.label} ribbon>70%</Label>
                                    <Card.Group itemsPerRow={4}>
                                      <Card raised color='red'>
                                          <Image src='http://semantic-ui.com/images/wireframe/square-image.png' size='medium'/>
                                          <Card.Content>
                                              <Header>
                                                  Product name</Header>
                                              <Card.Description>
                                                  lorem adasdako dkasjdopml ladlkaldo
                                              </Card.Description>
                                              <Icon style ={style.heart} circular name='heart' onClick={this.handleCart}/>
                                          </Card.Content>
                                        </Card>
                                          <Card raised color='red'>
                                              <Image src='http://semantic-ui.com/images/wireframe/square-image.png' size='medium'/>
                                              <Card.Content>
                                                  <Header>
                                                      Product name</Header>
                                                  <Card.Description>
                                                      lorem adasdako dkasjdopml ladlkaldo
                                                  </Card.Description>
                                                  <Icon style ={style.heart} circular name='heart' onClick={this.handleCart}/>

                                              </Card.Content>
                                          </Card>
                                          <Card raised color='red'>
                                              <Image src='http://semantic-ui.com/images/wireframe/square-image.png' size='medium'/>
                                              <Card.Content>
                                                  <Header>
                                                      Product name</Header>
                                                  <Card.Description>
                                                      lorem adasdako dkasjdopml ladlkaldo
                                                  </Card.Description>
                                                  <Icon style ={style.heart} circular name='heart' onClick={this.handleCart}/>

                                              </Card.Content>
                                          </Card>
                                          <Card raised color='red'>
                                              <Image src='http://semantic-ui.com/images/wireframe/square-image.png' size='medium'/>
                                              <Card.Content>
                                                  <Header>
                                                      Product name</Header>
                                                  <Card.Description>
                                                      lorem adasdako dkasjdopml ladlkaldo
                                                  </Card.Description>
                                                  <Icon style ={style.heart} circular name='heart' onClick={this.handleCart}/>

                                              </Card.Content>
                                          </Card>
                                    </Card.Group>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>
                    <Modal.Actions/>
                </Modal>

            </div>
        )
    }

}
