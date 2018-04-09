import React from 'react';
import { hashHistory } from 'react-router';
import {Card, Image, Rating, Label, Popup} from 'semantic-ui-react';
export default class VendorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: []
    };
  }

  handleCardClick = () => {
    const path = '/vendorDetail';
    hashHistory.push(path);
  }

  render() {
    const style = {
      main: {
        width: '100%',
        main: 'cyan'
      },
      outer: {
        margin: '3%'
      },
      name: {
        marginLeft: '20px',
        marginTop: '10px',
        color: '#cb202d',
        fontSize: '28px',
        fontWeight: 'bold',
        cursor: 'pointer'
      },
      address: {
        fontWeight: 'bold'
      },
      image: {
        marginTop: '10px'
      },
      pop: {
        backgroundColor: '#5BA829',
        borderColor: '#5BA829',
        color: 'white',
        float: 'right'
      }
    };
    let result = null;
    if (this.props.data) {
      result = this.props.data.map((item, index) => {
        const temp = [];
        if(item.ratings < 2) {
          temp[index] = 'POOR';
        } else if(item.ratings < 4) {
          temp[index] = 'Good';
        }
        else {
          temp[index] = 'Excellent';
        }
        return (
          <div>
            <Card style={style.main}>
              <Card.Content>
                  <Image floated='right' size='tiny' src='http://semantic-ui.com/images/avatar/large/steve.jpg' style={style.image}/>
                  <Label as='a' color='teal' ribbon='left'>
                      {item.discount}
                  </Label>
                  <Card.Header
                    style={style.name}
                    onClick={this.handleCardClick}
                  >
                      <p>{item.name}</p>
                  </Card.Header>
                  <Card.Meta >
                      <Popup style={style.pop}
                        trigger={< Rating icon = 'star' defaultRating = {item.ratings} maxRating = {5} size = 'mini' disabled/>}>
                         <strong>{temp[index]}</strong>
                      </Popup>

                  </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                  <p style={style.address}>Address:
                  </p>{item.address}
              </Card.Content>
            </Card>
          </div>
        );
      });
    }
    return (
      <div className='cardContainer'>
          <Card.Group style={style.outer}>
            {result}
          </Card.Group>
      </div>
    );
  }
}
