import React, {Component} from 'react';

import LocationMap from '../../components/locationmap';
import VendorList from '../../components/vendor-list';
import ApplicationBar from '../../components/appbar';
import getVendorList from './dummyData';


export default class AllVendors extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='vendorContainer'>
        <div className='allVendors'>
          <LocationMap />
          {/* <VendorList data={getVendorList()}/> */}
        </div>
      </div>
    );
  }
}
