import React, {Component} from 'react';

import ProductDetails from '../../components/productDetails';

export default class ProductDetailsView extends Component {
  constructor() {
    super();
  }

  render() {
  	const productID=this.props.location.query.pid;
    return (
    	
      <ProductDetails productID={productID}/>
    );
  }
}
