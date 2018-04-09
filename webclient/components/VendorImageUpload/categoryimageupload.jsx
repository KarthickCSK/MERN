import React from 'react';
import Axios from 'axios';
var Dropzone = require('react-dropzone');
var request = require('superagent');
import {Grid, Button, Dimmer, Loader} from 'semantic-ui-react';
import PreviewList from './previewlist';
import hashHistory from 'react-router';
import './categoryimageupload.css';
export default class CategoryImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.removeImageUploaded = this.removeImageUploaded.bind(this)
        this.state = {
            allFiles: [],
            uploadedImagescategory: [],
            dimmerstate: false
        };
    }
    onDrop(files)
    {

        files.forEach((file) => {
            this.state.allFiles[0] = file;
        });
        this.setState({allFiles: this.state.allFiles});
    }
    uploadImage()
    {
        this.setState({dimmerstate: true})
        let photo = new FormData();
        this.state.allFiles.forEach((file) => {
            photo.append('IMG', file);
        });
        request.post('/categoryimage/uploadcategory').send(photo).end((err, resp) => {
            this.setState({dimmerstate: false})
            if (err) {
                console.error(err);
            } else {

                let temp = []
                JSON.parse(resp.text).imagescategory.forEach((file) => {
                    temp.push(file);

                });
                this.setState({allFiles: []});
                this.props.handleuploadedImagescategory(temp);
                {};

            }
        });

    }
    
    removeImage(index)
    {
        console.log("in remove image");
        this.state.allFiles.splice(index, 1)
        this.setState({allFiles: this.state.allFiles});
    }
    removeImageUploaded()
    {
        this.props.handleremoveImagescategory(this.props.uploadedImagescategory);
    }
    render() {
        var text;
        if (this.props.uploadedImagescategory.length > 0) {
            var path = '/categoryimages/' + this.props.uploadedImagescategory[0];
            text = null;
        } else {
            text = <div>Try dropping some files here, or click to select files to upload your shop image</div>
        }
        return (

            <div>
                <Dimmer active={this.state.dimmerstate}>
                    <Loader content='Uploading,hold on a second.... '/>
                </Dimmer>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column style={{marginRight:'-15%'}}>
                            <Dropzone ref="dropzone" multiple={false} accept={'image/*'} onDrop={this.onDrop} className="dropzone-category">
                                <div>Try dropping some files here, or click to select files to upload</div>
                                {this.state.allFiles.length > 0
                                    ? <div>
                                            <img src={this.state.allFiles[0].preview} id="dropzonecategory-img"/>
                                        </div>
                                    : text}
                                {this.props.uploadedImagescategory.length > 0
                                    ? <div><img src={path} id="dropzonecategory-img"/></div>
                                    : null}
                            </Dropzone>
                        </Grid.Column>
                        <Grid.Column>
                            <Grid.Row>
                                {this.props.uploadedImagescategory.length > 0
                                    ? <Button basic color="orange" style={{'marginLeft':'25%'}} onClick={this.removeImageUploaded}>Remove</Button>
                                    : null}
                            </Grid.Row>
                            <Grid.Row style={{marginLeft:'12px'}}>
                                {this.state.allFiles.length > 0
                                    ? <div>
                                        <Button primary onClick={this.uploadImage} style={{
                                            'marginLeft': '21%'
                                        }}>
                                            Upload Image
                                        </Button>
                                        <Button basic color="orange" onClick={this.removeImage} style={{
                                        marginLeft: '65px',
                                        marginTop: '4%'
                                    }}>Remove</Button> < /div>:null}
                            </Grid.Row>
                        </Grid.Column>
                      </Grid.Row>
                </Grid>

            </div>
        );
    }
} //end of class
