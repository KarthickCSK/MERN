import React, {Component} from 'react';

import WishlistHandler from '../../components/wishlist';
// import ApplicationBar from '../../components/appbar';

export default class MyWishlist extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <WishlistHandler />
      </div>
    );
  }
}
