import React from 'react';
import {Card, Button, Grid} from 'semantic-ui-react';
var Dropzone = require('react-dropzone');
var request = require('superagent');
import style from './preview.css';

export default class preview extends React.Component {
	constructor (props) {
		super(props);
		this.removeImage = this.removeImage.bind(this);
	}
	removeImage()
	{
	 this.props.removeImage(this.props.removeindex);
	}

	render () {
		return (
					<Grid.Column width={5}>
					<div className='preview-upload-image-container'>
				<img className='preview-upload-image' src={this.props.files.preview} /></div><br/>
				<Button  basic color='orange' onClick={this.removeImage} style={{'marginLeft':85}}>Remove</Button>
			</Grid.Column>
		);
	}
}//end of class
