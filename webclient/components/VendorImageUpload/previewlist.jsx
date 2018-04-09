import React from 'react';
import {Grid} from 'semantic-ui-react';
import Preview from './preview';

export default class previewlist extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
	 const imagePreview = this.props.imageFiles.map((file, index)=>
	 <Preview key={index} files={file} removeindex={index} removeImage={this.props.removeImage}/>
	 );
		return (
			<div>
				<Grid>
      {imagePreview}
			</Grid>
			</div>
		);
	}
}//end of class
