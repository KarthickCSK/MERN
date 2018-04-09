import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Form, Grid, Input} from 'semantic-ui-react';
import Vendormap from './map.jsx';
import {Link} from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import validator from 'validator';
import axios from 'axios';
export default class UpdateShop extends React.Component

{
    constructor(props)

    {

        super(props);

        this.state = {
            username: '',
            shopname: '',
            shopurl: '',
            address: '',
            contactnumber: '',
            error: false,
            city: '',
            country: '',
            state: '',
            pincode: '',
            latitude: '',
            errormsg: '',
            longitude: '',
            errornumber: false,
            erroraddress: false,
            erroraddressmsg: '',
            errorphone: false,
            errorurl: false,
            errorurlmsg: '',
            errorshop: false,
            errornamemsg: '',
            email: '',
            open: false,
            disable: false,
            addflag: true,
            nameflag: true,
            urlflag: true,
            phoneflag: true
        };

        this.addaddress = this.addaddress.bind(this);
        this.handleafteraddress = this.handleafteraddress.bind(this);

        this.handleshopname = this.handleshopname.bind(this);

        this.handleshopurl = this.handleshopurl.bind(this);

        this.handlecontactnumber = this.handlecontactnumber.bind(this);
        this.handleaddress = this.handleaddress.bind(this);
        this.update = this.update.bind(this);
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
        }, 1000);
    }

    handleafteraddress = (value) => {
        if (validator.isEmpty(value)) {

            this.setState({erroraddress: true, erroraddressmsg: 'Cannot Be Empty', addflag: false, open: false, disable: true});
        } else {
            {
                this.setState({erroraddress: false, erroraddressmsg: '', addflag: true, open: false});
                this.showSubmit();
            }
        }
    }
    handleaddress = (e, data) => {
        let value = data.value;
        this.setState({address: value});
        if (validator.isEmpty(data.value)) {
            this.setState({erroraddress: true, erroraddressmsg: 'Cannot Be Empty', addflag: false, open: false, disable: true});
        } else {
            {
                this.setState({erroraddress: false, erroraddressmsg: '', addflag: true, open: false});
                this.showSubmit();
            }
        }
    }
    handleshopname = (e, data) => {
        let value = data.value;

        this.setState({shopname: value});
        if (validator.isEmpty(data.value)) {
            this.setState({errorshop: true, errornamemsg: 'Cannot Be Empty', nameflag: false, open: false, disable: true})
        } else {
            this.setState({errornamemsg: '', errorshop: false, nameflag: true, open: false, shopname: value});
            this.showSubmit();
        }
    }
    handlecontactnumber = (e, data) => {
        e.preventDefault()
        let value = data.value
        this.setState({contactnumber: value})
        if ((validator.isNumeric(value))) {
            if (validator.isLength((value), 10, 10)) {
                this.setState({errorphone: false, phoneflag: true, errormsg: ''});
                this.showSubmit();
            } else {
                this.setState({errorphone: true, errormsg: 'Should be 10 digits', phoneflag: false, open: false, disable: true});
            }
        } else {
            this.setState({errorphone: true, errormsg: 'Should contains Number only', phoneflag: false, open: false, disable: true});
        }
    }
    handleshopurl = (e, data) => {
        e.preventDefault();
        let value = data.value;
        this.setState({shopurl: value});
        if (validator.isURL(value)) {
            this.setState({errorurl: false, errorurlmsg: '', urlflag: true, opensnack: false});
            this.showSubmit();
        } else {
            this.setState({errorurl: true, errorurlmsg: 'Give A Proper URL Format ', urlflag: false, open: false, disable: true});
        }
    }

    update = (e) => {
        e.preventDefault();
        axios.post('/SaveShop/updateshop', {
            shopid: this.props.location.query.shopid,
            shopname: this.state.shopname,
            shopurl: this.state.shopurl,
            contactnumber: this.state.contactnumber,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            pincode: this.state.pincode,
            lat: this.state.latitude,
            long: this.state.longitude
        }).then(function(response) {
            if (response.data) {
                //                console.log("helllo")
                this.myFunction();
                this.setState({
                    shopname: '',
                    shopurl: '',
                    address: '',
                    contactnumber: '',
                    city: '',
                    country: '',
                    state: '',
                    pincode: '',
                    latitude: '',
                    errormsg: '',
                    longitude: '',
                    erroraddress: false,
                    erroraddressmsg: '',
                    errorphone: false,
                    errorurl: false,
                    errorurlmsg: '',
                    errorshop: false,
                    errornamemsg: '',
                    open: false,
                    disable: false,
                    addflag: true,
                    nameflag: true,
                    urlflag: true,
                    phoneflag: true
                });
            }
        }.bind(this)).catch(function(error) {
            console.log(error);
        }.bind(this));
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

    componentDidMount()
    {
        axios.post('/SaveShop/viewshopdetail', {shopid: this.props.location.query.shopid}).then(function(response) {
            this.setState({
                shopname: response.data.shopname,
                shopurl: response.data.shopurl,
                address: response.data.address,
                contactnumber: response.data.contactnumber,
                city: response.data.city,
                pincode: response.data.pincode,
                state: response.data.state,
                country: response.data.country,
                latitude: response.data.lat,
                longitude: response.data.lng
            });
        }.bind(this)).catch(function(error) {});

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

    render()

    {

        return (

            <div>

                <Grid>

                    <Grid.Row id='vendorreg-gridrow'>

                        <Grid.Column width={3}/>

                        <Grid.Column width={10}>

                            <Form className='vendorreg-form'>

                                <fieldset id='vendorreg-field'>

                                    <legend className='vendorreg-profile'>Profile:</legend>

                                    <Form.Field className='vendorreg-address'>

                                        <label className='vendorreg-label'>Name</label>

                                        <Input placeholder=' Name' readOnly color='#f2f2f2' className='vendorreg-disable' value={this.state.username}/>

                                    </Form.Field>

                                    <Form.Field className='vendorreg-address'>

                                        <label className='vendorreg-label'>Email</label>

                                        <Input placeholder='Email' readOnly color='#f2f2f2' value={this.state.email} className='vendorreg-disable'/>

                                    </Form.Field>

                                </fieldset>

                                <Grid>

                                    <Grid.Row style={{
                                        paddingBottom: '20px'
                                    }}>

                                        <Grid.Column width={8}>
                                            <Form.Field className='vendorreg-shopfield'>
                                                <label className='vendorreg-label'>Shop Name</label>
                                                <Form.Input placeholder='Shop Name' error={this.state.errorshop} onChange={this.handleshopname} value={this.state.shopname}/>
                                                <p id='vendorreg-errormsg'>{this.state.errornamemsg}</p>
                                            </Form.Field>
                                            <Form.Field>
                                                <label className='vendorreg-label'>Location</label>
                                                <Vendormap data={this.addaddress} latitude={this.state.latitude} longitude={this.state.longitude}/>
                                            </Form.Field>
                                        </Grid.Column>
                                        {/*<Grid id='vendorreg-grid' divided='vertically' stackable>
                  <Grid.Row >*/}
                                        <Grid.Column className='vendorreg-addressmap'>
                                            <Form.Field className='vendorreg-shopfield'>
                                                <label className='vendorreg-label'>Shop URL</label>
                                                <Form.Input placeholder='Shop URL' error={this.state.errorurl} onChange={this.handleshopurl} value={this.state.shopurl}/>
                                                <p id='vendorreg-errormsg'>{this.state.errorurlmsg}</p>
                                            </Form.Field>
                                            <Form.Field className='vendorreg-shopfield'>
                                                <label className='vendorreg-label'>Contact Number</label>
                                                <Form.Input placeholder='Contact Number' error={this.state.errorphone} onChange={this.handlecontactnumber} value={this.state.contactnumber}/>
                                                <p id='vendorreg-errormsg'>{this.state.errormsg}</p>
                                            </Form.Field>
                                            <Grid.Column id='vendorreg-locationgroup'>
                                                <Form.Group>
                                                    <Form.TextArea name='address' label='Address' placeholder='Enter Address..' rows='3' id='vendorreg-text' error={this.state.erroraddress} value={this.state.address.toString()} onChange={this.handleaddress}/>
                                                </Form.Group>
                                                <p id='vendorreg-errormsg'>{this.state.erroraddressmsg}</p>
                                                <Form.Group className='vendorreg-address'>
                                                    <Form.Field >
                                                        <label className='vendorreg-label'>City</label>
                                                        <Form.Input placeholder='City' value={this.state.city}/>
                                                    </Form.Field>
                                                    <Form.Field >
                                                        <label className='vendorreg-label'>State</label>
                                                        <Form.Input placeholder='State' value={this.state.state}/>
                                                    </Form.Field>
                                                </Form.Group>
                                                <Form.Group className='vendorreg-address'>
                                                    <Form.Field >
                                                        <label className='vendorreg-label'>Pincode</label>
                                                        <Form.Input placeholder='Pincode' value={this.state.pincode}/>
                                                    </Form.Field>
                                                    <Form.Field >
                                                        <label className='vendorreg-label'>Country</label>
                                                        <Form.Input placeholder='Country' value={this.state.country}/>
                                                    </Form.Field>
                                                </Form.Group>
                                                <Link to='/viewshop'>
                                                    <Button type='submit' id='vendorreg-submitbutton' basic disabled={this.state.disable} color='orange' onClick={this.update}>
                                                        Submit
                                                    </Button>
                                                </Link>
                                            </Grid.Column>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <div id='snackbar' ref='snackbar'>Shop Updated Successfully</div>
            </div>

        );

    }

}
