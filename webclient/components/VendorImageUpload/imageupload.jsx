import React from 'react';
import Axios from 'axios';
var Dropzone = require('react-dropzone');
var request = require('superagent');
import {Grid, Button,Dimmer,Loader} from 'semantic-ui-react';
import PreviewList from './previewlist';
import PreviewListUploaded from './PreviewListUploaded'
import hashHistory from 'react-router';
import axios from 'axios'
export default class ImageUplaod extends React.Component {
    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.removeImageServer=this.removeImageServer.bind(this)
        this.state ={ allFiles: [],
          dimmerstate:false};
    }
   onDrop(files)
    {
        files.forEach((file) => {
            this.state.allFiles.push(file);
        });
       this.setState({allFiles: this.state.allFiles});
    }
   uploadImage()
    {
        this.setState({dimmerstate:true})
        let photo = new FormData();
        this.state.allFiles.forEach((file)=>
        {
          photo.append('IMG',file);
        });
        request.post('/uploadimage/upload').send(photo).end((err, resp)=>
        {
            if (err)
            {
                this.setState({dimmerstate:false})
                console.error(err);
            }
            else
            {
                this.setState({dimmerstate:false})
              let temp=[]
              JSON.parse(resp.text).images.forEach((file)=>
              {
              temp.push(file);
              });
              this.setState({ allFiles:[]});
              this.props.handleaddimageserver(temp);
            }
        });
    }
removeImage(index)
    {

        this.state.allFiles.splice(index, 1)
        this.setState({allFiles: this.state.allFiles});
    }
    removeImageServer(filename,index)
    {
     this.props.handleremoveimageserver(filename,index)
    }
   render() {
        return (
            <div>
              <Dimmer active={this.state.dimmerstate}>
               <Loader content='Uploading,hold on a second.... ' />
             </Dimmer>
                <Grid>
                        <Grid.Row>
                          <Grid.Column width={10}>
                        <Dropzone ref="dropzone" multiple={true} accept={'image/*'} onDrop={this.onDrop}>
                            <div>Try dropping some files here, or click to select files to upload.</div>
                        </Dropzone>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={10}>
                        <Button primary onClick={this.uploadImage}>
                            Upload Image
                        </Button>
                        </Grid.Column>
                      </Grid.Row>
                    <Grid.Row>
                        {this.state.allFiles.length > 0
                            ? <div>
                                    <h2>Uploading {this.state.allFiles.length}
                                        files...</h2>
                                    <PreviewList imageFiles={this.state.allFiles} removeImage={this.removeImage}/>
                                </div>
                            : null}
                    </Grid.Row>
                    <Grid.Row>
                        {this.props.imagedata.length > 0
                            ? <div>
                                    <h2>uploaded</h2>

                                      <PreviewListUploaded  className='product-upload-image' imageFiles={this.props.imagedata} removeImage={this.removeImageServer}/>
                                </div>
                            : null}
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
} //end of class
