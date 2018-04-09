import React from 'react';
import {Grid} from 'semantic-ui-react';
import Preview from './previewupload';

export default class previewlistuploaded extends React.Component {
	constructor (props) {
		super(props);
	}
  render () {
	 const imagePreview = this.props.imageFiles.map((file, index)=>
	 <Preview key={index} files={file} removeindex={index} removeImage={this.props.removeImage}/>
	 );
		return (
			<Grid>
      {imagePreview}
			</Grid>
		);
	}
}
