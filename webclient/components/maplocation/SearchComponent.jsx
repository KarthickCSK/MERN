import React from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import {Button} from 'semantic-ui-react';
import './searchcomponent.css';

export default class AllPlaces extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
    this.onChange = (address) => this.setState({ address });
  }

  handleFormSubmit = () => {
    const { address } = this.state;
    geocodeByAddress(address, (err, { lat, lng }) => {
      if (err) {
        // console.log('Oh no!', err)
      }
      // console.log(`Yay! got latitude and longitude for ${address}`, { lat, lng })
      this.props.searchplace({ lat, lng});
    });
  }

  render() {
    const options = {
      componentRestrictions: {country: 'IN'}
    };

    const myStyles = {
       label: {display: 'none' },
       input: {
         width: '100%',
         fontSize: '20px',
         fontColor: '#bfbfbf',
         borderRadius: '4',
         borderBox: 'none'
       },
       autocompleteContainer: {fontSize: '18px' },
       autocompleteItem: {color: 'grey' },
       autocompleteItemActive: { color: 'black'}
     };
    return (
      <div className="autoCompleteContainer">
        <PlacesAutocomplete
          placeholder="Search places..."
          value={this.state.address}
          onChange={this.onChange.bind(this)}
          options={options}
          styles={myStyles}
          />
        <Button id='searchButton' primary fluid
          onClick={this.handleFormSubmit}
          className='searchBtn'
        >
          Search
        </Button>
      </div>
    );
  }
}
