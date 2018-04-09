import React from 'react';
import {Button, Form, Grid, Dimmer, Loader} from 'semantic-ui-react';
import Vendormap from '../vendormap/vendormap.jsx';
import validator from 'validator';
import style from './vendorregform.css';
import Snackbar from 'material-ui/Snackbar';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';
var request = require('superagent');
export default class Vendorregform extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            pincode: '',
            state: '',
            country: '',
            city: '',
            latitude: '',
            longitude: '',
            shopname: '',
            address: '',
            shopurl: '',
            erroraddressName: '',
            errormsg: '',
            contactnumber: '',
            errorphone: false,
            errorurl: false,
            errorurlmsg: '',
            errorshop: false,
            errornamemsg: '',
            opensnack: false,
            username: '',
            email: '',
            erroraddress: false,
            erroraddressmsg: '',
            disable: true,
            addflag: false,
            nameflag: false,
            urlflag: false,
            phoneflag: false,
            allfiles: [],
            uploadedshopimages: [],
            dimmerstate: false
        };
        this.addaddress = this.addaddress.bind(this);
        this.save = this.save.bind(this);
        this.handledatashopurl = this.handledatashopurl.bind(this);
        this.handledataaddress = this.handledataaddress.bind(this);
        this.handleafteraddress = this.handleafteraddress.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.removeImageUploaded = this.removeImageUploaded.bind(this);
        this.flag = true;
        axios.get('auth/userInfo').then((response) => {
            this.setState({username: response.data.user.local.name.toUpperCase(), email: response.data.user.local.email})
        }).catch((err) => {})
    }
    // snackbar
    myFunction = () => {
        const mapRef = this.refs.snackbar;
        const node = ReactDOM.findDOMNode(mapRef);
        node.className = "show";
        setTimeout(function() {
            node.className = node.className.replace("show", "");
        }, 3000);
    }

    handleafteraddress = (value) => {
        if (validator.isEmpty(value)) {
            this.setState({erroraddress: true, erroraddressmsg: 'Cannot Be Empty', addflag: false, disable: true});
        } else {
            {
                this.setState({erroraddress: false, erroraddressmsg: '', addflag: true});
                this.showSubmit();
            }
        }
    }
    handledataaddress = (e, data) => {
        let value = data.value;
        this.setState({address: value});
        if (validator.isEmpty(data.value)) {
            this.setState({erroraddress: true, erroraddressmsg: 'Cannot Be Empty', addflag: false,  disable: true});
        } else {
            {
                this.setState({erroraddress: false, erroraddressmsg: '', addflag: true});
                this.showSubmit();
            }
        }
    }
    handledatashopname = (e, data) => {
        e.preventDefault();
        let value = data.value;
        this.setState({shopname: value, errornamemsg: ''});
        if (validator.isEmpty(data.value)) {
            this.setState({errorshop: true, errornamemsg: 'Cannot Be Empty ', nameflag: false, disable: true})
        } else {
            this.setState({errornamemsg: '', errorshop: false, nameflag: true, shopname: value});
            this.showSubmit();
        }

    }
    handledatacontactnumber = (e, data) => {
        e.preventDefault()
        this.setState({contactnumber: data.value})
        if ((validator.isNumeric(data.value))) {
            if (validator.isLength((data.value), 10, 10)) {
                this.setState({errorphone: false, phoneflag: true, errormsg: ''});
                this.showSubmit();
            } else {
                this.setState({errorphone: true, errormsg: 'Should be 10 digits', phoneflag: false, disable: true});

            }
        } else {
            this.setState({errorphone: true, errormsg: 'Should contains Number only', phoneflag: false, disable: true});
        }
    }
    handledatashopurl = (e, data) => {
        e.preventDefault();
        let value = data.value;
        this.setState({shopurl: value});
        if (validator.isURL(value)) {
            this.setState({errorurl: false, errorurlmsg: '', urlflag: true, opensnack: false});
        } else {
            this.setState({
                errorurl: true,
                errorurlmsg: 'Give A Proper URL Format ',
                disable: true,
                urlflag: false,
                opensnack: false,
                shopurl: value
            });
            this.showSubmit();
        }
    }
    save = (e) => {

        e.preventDefault();
        var path
        if (this.state.uploadedshopimages.length > 0) {
            path = this.state.uploadedshopimages[0]
        } else {
            path = 'defaultshopimage.png'
        }
        axios.post('/SaveShop/save', {
            shopname: this.state.shopname,
            shopaddress: this.state.address,
            shopurl: this.state.shopurl,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            city: this.state.city,
            state: this.state.state,
            pincode: this.state.pincode,
            country: this.state.country,
            contactnumber: this.state.contactnumber,
            shopimageurl: path
        }).then(function(response) {
            if (response.data === 'Added Shop') {
                this.myFunction();
                this.flag = true;
                this.setState({
                    opensnack: true,
                    shopname: '',
                    shopurl: '',
                    contactnumber: '',
                    address: '',
                    city: '',
                    state: '',
                    country: '',
                    pincode: '',
                    disable: true,
                    addflag: false,
                    nameflag: false,
                    urlflag: false,
                    phoneflag: false,
                    uploadedshopimages: []
                });
            }
        }.bind(this)).catch(function(error) {});
    }
    addaddress = (obj, lat, long) => {
        let length = obj.length;
        let objcon = obj.splice(length - 1, length);
        let objstate = ((obj.splice(length - 2, length - 1)).toString()).split(' ');
        let objcity = obj.splice(length - 3, length - 2);
        if (objstate.length === 3) {
            this.setState({
                state: objstate[1],
                address: obj.splice(0, length - 3),
                country: objcon,
                pincode: objstate[objstate.length - 1],
                city: objcity,
                latitude: lat,
                longitude: long
            });
            this.handleafteraddress(this.state.address.toString());
        } else {
            this.setState({
                state: objstate[1] + ' ' + objstate[2],
                address: obj.splice(0, length - 3),
                country: objcon,
                pincode: objstate[objstate.length - 1],
                city: objcity,
                latitude: lat,
                longitude: long
            });
            this.handleafteraddress(this.state.address.toString());
        }
    }
    componentWillUpdate(props, state) {
        if (state.nameflag) {
            if (state.urlflag) {
                if (state.phoneflag) {
                    if (state.addflag) {
                        this.flag = false;
                    }
                }

            }
        }
    }

    showSubmit = () => {
        this.setState({disable: this.flag});
    }
    onDrop(file)
    {
        this.state.allfiles = [];
        file.forEach((file) => {
            this.state.allfiles.push(file);
        });
        this.setState({allfiles: this.state.allfiles});
    }
    uploadImage()
    {
        this.setState({dimmerstate: true})
        let photo = new FormData();
        this.state.uploadedshopimages = [];
        this.state.allfiles.forEach((file) => {
            photo.append('IMG', file);
        });
        request.post('/shopimages/uploadshopimage').send(photo).end((err, resp) => {
            this.setState({dimmerstate: false});
            if (err) {} else {
                let temp = []
                JSON.parse(resp.text).imagesshop.forEach((file) => {
                    this.state.uploadedshopimages.push(file)
                });
                this.setState({allfiles: []});
                this.setState({uploadedshopimages: this.state.uploadedshopimages});
            }
        });

    }
    removeImage()
    {
        this.setState({allfiles: []})
    }
    removeImageUploaded()
    {
        axios.post('/uploadimage/deletefromservershop', {imagename: this.state.uploadedshopimages[0]}).then((response) => {
            this.setState({uploadedshopimages: []})

        }).catch((error) => {});

    }
    render()
    {

        var path;
        var text
        if (this.state.uploadedshopimages.length > 0) {
            path = '../../../webserver/shopimages/' + this.state.uploadedshopimages[0];
            text = null;
        } else {
            text = <div>Try dropping some files here, or click to select files to upload your shop image</div>
        }

        return (
            <div>
                <Dimmer active={this.state.dimmerstate}>
                    <Loader>Uploading please hold on...</Loader>
                </Dimmer>
                <Grid>
                    <Grid.Row id='vendorreg-gridrow'>
                        <Grid.Column width={3}></Grid.Column>
                        <Grid.Column width={10}>
                            <Grid style={{
                                marginLeft: "1%"
                            }}>

                                {/*<Grid.Column width={3}>
                          </Grid.Column>*/}

                                <Form className='vendorreg-formprofile'>
                                    <fieldset id='vendorreg-field'>
                                        <legend className='vendorreg-profile'>Profile:</legend>

                                        <Form.Field className='vendorreg-address'>
                                            <label className='vendorreg-label'>Name</label>
                                            <input id='vendorreg-shopDisable' placeholder=' Name' readOnly color='#f2f2f2' className='vendorreg-disable' value={this.state.username}/>
                                        </Form.Field>
                                        <Form.Field className='vendorreg-address'>
                                            <label className='vendorreg-label'>Email</label>
                                            <input id='vendorreg-shopDisable' placeholder='Email' readOnly color='#f2f2f2' value={this.state.email} className='vendorreg-disable'/>
                                        </Form.Field>

                                    </fieldset>
                                </Form>
                                <Dropzone ref="dropzone" multiple={false} accept={'image/*'} onDrop={this.onDrop} className='dropzone-reg'>
                                    {this.state.allfiles.length > 0
                                        ? <img src={this.state.allfiles[0].preview} id='dropzone-img'/>
                                        : text}
                                    {this.state.uploadedshopimages.length > 0
                                        ? <div><img src={"/shopimages/" + this.state.uploadedshopimages[0]} id='dropzone-img'/></div>
                                        : null}
                                </Dropzone>
                                {this.state.allfiles.length > 0
                                    ? <div id='dropzone-button'><br/>
                                            <Button primary onClick={this.uploadImage}>Upload Image</Button><br/>
                                            <br/>
                                            <Button primary onClick={this.removeImage}>Remove Image</Button>
                                        </div>
                                    : null}
                                {this.state.uploadedshopimages.length > 0
                                    ? <div id='dropzone-button'><br/><br/>
                                            <Button id='dropzone-button' primary onClick={this.removeImageUploaded} id='uploadimagebutton'>Remove</Button>
                                        </div>
                                    : null}
                            </Grid>
                            <Form className='vendorreg-form'>
                                <Grid>
                                    <Grid.Row style={{
                                        paddingBottom: '20px',
                                        paddingTop: '30px'
                                    }}>
                                        <Grid.Column width={8}>
                                            <Form.Field className='vendorreg-shopfield'>
                                                <label className='vendorreg-label'>Shop Name</label>
                                                <Form.Input placeholder='Shop Name'  error={this.state.errorshop} onChange={this.handledatashopname} value={this.state.shopname}/>
                                                <p id='vendorreg-errormsg'>{this.state.errornamemsg}</p>
                                            </Form.Field>
                                            <Form.Field>
                                                <label className='vendorreg-label'>Location</label>
                                                <Vendormap data={this.addaddress}/>
                                            </Form.Field>
                                        </Grid.Column>
                                        {/*<Grid id='vendorreg-grid' divided='vertically' stackable>
                          <Grid.Row >*/}
                                        <Grid.Column className='vendorreg-addressmap'>
                                            <Form.Field className='vendorreg-shopfield'>
                                                <label className='vendorreg-label'>Shop URL</label>
                                                <Form.Input placeholder='Shop URL' error={this.state.errorurl} onChange={this.handledatashopurl} value={this.state.shopurl}/>
                                                <p id='vendorreg-errormsg'>{this.state.errorurlmsg}</p>
                                            </Form.Field>
                                            <Form.Field className='vendorreg-shopfield'>
                                                <label className='vendorreg-label'>Contact Number</label>
                                                <Form.Input placeholder='Contact Number' error={this.state.errorphone} onChange={this.handledatacontactnumber} value={this.state.contactnumber}/>
                                                <p id='vendorreg-errormsg'>{this.state.errormsg}</p>
                                            </Form.Field>

                                            <Grid.Column id='vendorreg-locationgroup'>
                                                <Form.Group>
                                                    <Form.TextArea name='address' label='Address' placeholder='Enter Address..' rows='3' id='vendorreg-text' error={this.state.erroraddress} value={this.state.address.toString()} onChange={this.handledataaddress}/>
                                                </Form.Group>
                                                <p id='vendorreg-errormsg'>{this.state.erroraddressmsg}</p>
                                                <Form.Group className='vendorreg-address'>
                                                    <Form.Field >
                                                        <label className='vendorreg-label'>City</label>
                                                        <input placeholder='City' value={this.state.city}/>
                                                    </Form.Field>
                                                    <Form.Field >
                                                        <label className='vendorreg-label'>State</label>
                                                        <input  placeholder='State' value={this.state.state}/>
                                                    </Form.Field>
                                                </Form.Group>
                                                <Form.Group className='vendorreg-address'>
                                                    <Form.Field >
                                                        <label className='vendorreg-label'>Pincode</label>
                                                        <input placeholder='Pincode' value={this.state.pincode}/>
                                                    </Form.Field>
                                                    <Form.Field >
                                                        <label className='vendorreg-label'>Country</label>
                                                        <input placeholder='Country' value={this.state.country}/>
                                                    </Form.Field>
                                                </Form.Group>
                                                <Button type='submit' id='vendorreg-submitbutton' basic color='orange' disabled={this.state.disable} onClick={this.save}>
                                                    Submit
                                                </Button>
                                            </Grid.Column>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <div ref='snackbar' id='snackbar'>
                    Shop Added Successfully
                </div>
            </div>
        );
    }
}
