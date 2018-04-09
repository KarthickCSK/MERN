import React, {Component} from 'react';

import About from '../../components/aboutUs';

export default class AboutUsView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <About />
      </div>
    );
  }
}
