import React, {Component} from 'react';

import ConfirmPassword from '../../components/confirmPassword';

export default class Confirm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const location = this.props.location;
    return (
      <ConfirmPassword location={location}/>
    );
  }
}
