import React, {Component} from 'react';

import Login from '../../components/login';

export default class LoginView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const location = this.props.location;
    return (
      <Login location={location}/>
    );
  }
}
