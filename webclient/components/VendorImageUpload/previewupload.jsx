import React from 'react';
import {Grid, Button} from 'semantic-ui-react';
var Dropzone = require('react-dropzone');
var request = require('superagent');
import style from './preview.css';

export default class previewupload extends React.Component {
	constructor (props) {
		super(props);
		this.removeImage = this.removeImage.bind(this);
	}
	removeImage()
	{
	 this.props.removeImage(this.props.files,this.props.removeindex);
	}

	render () {
		
		var path='/images/'+this.props.files
		return (
				<Grid.Column width={5}>
				<div className='preview-upload-image-container'>
					<img className='preview-upload-image' src={path}/><br/>
					</div>

					<Button  basic color="orange" onClick={this.removeImage} style={{'marginLeft':88}}>Remove</Button>
					</Grid.Column>
		);
	}
}//end of class
