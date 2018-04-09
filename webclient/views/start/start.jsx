import React, {Component} from 'react';

import Start from '../../components/start';

export default class StartView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  	const msg = this.props.msg;

    return (
      <div>
        <Start msg={msg}/>
      </div>
    );
  }
}
