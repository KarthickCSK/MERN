import React from 'react';

import LocationMap from '../../components/locationmap';

export default class Home extends React.Component {
	constructor()
	{
        super();
}


	render () {
		return (
			<div>
			<LocationMap/>
			</div>
		);
	}
}
