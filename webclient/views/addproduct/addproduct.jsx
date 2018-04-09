import React, {Component} from 'react';

import ProductRegister from '../../components/productRegister';

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <ProductRegister />
      </div>
    );
  }
}
