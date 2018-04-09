import React, {Component} from 'react';

import ForgotPassword from '../../components/forgotPassword';

export default class ForgotPasswordView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <ForgotPassword />
      </div>
    );
  }
}
