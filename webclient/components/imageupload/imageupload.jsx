import React from 'react';
import Dropzone from 'react-dropzone';
var request = require('superagent');
import {Button} from 'semantic-ui-react';
import style from './style.css'
/* Custom CSS */
//import './imageupload.css';

/*Adding product images*/
export default class ImageUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: []
        }
    }

    onOpenClick = () => {
        this.refs.dropzone.open();
    }

    /* function to attach the file to the server*/
    dropHandler = (file) => {
        var photo = new FormData();
        photo.append('IMG', file[0]);
        console.log(file);
        this.setState({file: file});
        request.post('/upload').send(photo).end(function(err, resp) {
            if (err) {
                console.error(err);
            }
            return resp;
        });
    }

    /* it's a function to drag and drop or select images to upload */
    render() {
        return (
            <div>
                <Dropzone ref='dropzone' className='dropzone' multiple={true} accept={'image/*'} onDrop={this.dropHandler}>
                    <div>
                        Drop a photo, or click to add
                        <div>{this.state.file.map((file) => <img src={file.preview} style={{
                                height: 200,
                                width: 200
                            }}/>)}</div>
                    </div>
                </Dropzone>

            </div>
        );
    }
}
