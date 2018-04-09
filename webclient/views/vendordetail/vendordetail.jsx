import React, {Component} from 'react';

import ShowRoomDetail from '../../components/ShowRoomDetail';

export default class VendorDetail extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <ShowRoomDetail open={true}/>
      </div>
    );
  }
}
