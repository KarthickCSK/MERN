import React,{PropTypes} from 'react';
import {
    Card,
    Icon,
    Button,
    Label,
    Divider,
    Statistic,
    Grid,
    Header,
    Segment,Table,Modal,Input,Form
} from 'semantic-ui-react';
import Snackbar from 'material-ui/Snackbar';
import axios from 'axios';
import queryString from 'query-string';
import {hashHistory} from 'react-router';
import validator from 'validator';
import style from './vendorUpdate.css';
import RichTextEditor from 'react-rte';
//import ProductDetails from '../productDetails'
//import './productlist.css'
export default class VendorProductList extends React.Component {
    constructor() {
        super();
        this.state = {
            shopID: '',
            cid: '',
            sid: '',
            pid: '',
            rate: 0,
            temp:'',
            /*its value change as their Parent state value*/
            value: '',
            FilteredProducts: [],
            price: '',
            discount: '',
            quantity: '',
            openmodal: false,
            id: '',
            snackbar: false,
            errorquantityMSG:'',
            errorpricemsg: '',
                errorquantityrice: false,
                  errorquantityrdiscount: false,
            errordisMSG: '',
            errormsg:'',
            value: RichTextEditor.createEmptyValue(),
            Description:'',
            snackmsg:''
        };
              this.handleprice = this.handleprice.bind(this);
              this.delete = this.delete.bind(this);
              this.update = this.update.bind(this);
              this.handledelete = this.handledelete.bind(this);
              this.handleSnack = this.handleSnack.bind(this);
    }
    componentDidMount() {
        {

            this.getDetails()
        }
    }
    componentWillReceiveProps(nextProps) {
        {
            this.getDetails()
        }
    }
    getDetails = () => {

        this.setState({
            openProductList: this.props.openProductList
        }, () => {
            if (Object.keys(this.props).length == 4) {

                this.setState({
                    shopID: this.props.shopID,
                    cid: this.props.cid,
                    sid: this.props.sid
                }, () => {
                    $.ajax({
                        url: '/filterQuery/showFilteredProduct',
                        type: 'POST',
                        data: {
                            shopID: this.state.shopID,
                            Category: this.state.cid,
                            SubCategory: this.state.sid,
                            QueryDecide: 3
                        },
                        success: function(response) {
                            this.setState({
                                FilteredProducts: response
                            })
                        }.bind(this)
                    });
                })
            } else if ((Object.keys(this.props.productDetails).length == 2) || (Object.keys(this.props.productDetails).length == 8)){
                $.ajax({
                    url: '/filterQuery/showFilteredProduct',
                    type: 'POST',
                    data: this.props.productDetails,
                    success: function(response) {
                        this.setState({
                            FilteredProducts: response
                        })
                    }.bind(this)
                });
            }
        })
}




    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }


    static propTypes = {
        onChange: PropTypes.func
    };

    onChange = (value) => {
        this.setState({value});

        if (this.props.onChange) {
            // Send the changes up to the parent component as an HTML string.
            // This is here to demonstrate using `.toString()` but in a real app it
            // would be better to avoid generating a string on each change.
            this.props.onChange(value.toString('html'));
        }
    };

    handleRequestClose = () => {
        this.setState({snackbar: false});
    };

    handleprice = (e, data) => {
        e.preventDefault();
        if (validator.isFloat(data.value) && (!validator.isEmpty(data.value))) {
            this.setState({errorprice: false, errorpricemsg: ''});
        } else {
            this.setState({errorprice: true, errorpricemsg: 'Only Number'});
        }
        this.setState({price:data.value})

    }

    handlediscount = (e, data) => {
        e.preventDefault();
        let value=data.value;
        if (validator.isFloat(value, [
            {
                max: 100,
                min: 0
            }
        ])) {
            if ((value > 0) && (value < 100) && (value.length <= 2)) {
                this.setState({errordiscount: false, errordisMSG: ''});
            } else {
                this.setState({errordiscount: true, errordisMSG: 'Enter Discount Between 1 And 99'})
            }
        } else {
            this.setState({errordiscount: true, errordisMSG: 'Enter Discount Between 1 And 99'});
        }
        this.setState({discount:value})
    }

    handlequantity = (e, data) => {
        e.preventDefault();

        if ((validator.isNumeric(data.value) && (!validator.isEmpty(data.value)))) {

            this.setState({errorquantity: false, errorquantityMSG: ''})
        } else {
            this.setState({errorquantity: true, errorquantityMSG: 'Only Numbers '})
        }
        this.setState({quantity: data.value})

    }
    update = (details) => {
        this.setState({discount: details.discount, price: details.price, quantity: details.quantity, id: details._id,Description:details.description})
    }
    handleupdate = (details) => {
        this.update(details);
        this.handlemodal();

    }
    handledelete = (data) => {
        this.delete(data);
    }

    delete = (data) => {

        axios.post('updatecatalogue/delete', {id: data}).then((response) => {

            if (response.data) {
                this.getDetails()
                this.setState({snackmsg: 'Deleted Successfully', snackbar: true})
            } else {
                this.setState({snackmsg: 'Delete Failed', snackbar: true})
            };
        }).catch((err) => {
            if (err) {
                this.setState({snackmsg: 'Delete Failed',snackbar:true})
            }
        })
    }
    handleSnack() {
        this.setState({
            snackbar: !this.state.snackbar
        })
    }
    handlemodal = () => {

        this.setState({
            openmodal: !this.state.openmodal
        })
    }
    handleDescription=()=>{
      e.preventDefault();
      this.setState({Description: data.value})
    }

    handleSubmit = () => {

        let obj = {};
        obj.quantity = this.state.quantity;
        obj.price = this.state.price;
        obj.discount = this.state.discount;
        obj.id = this.state.id;
        obj.value= this.state.Description;
        axios.post('updatecatalogue/update', {object: obj}).then((response) => {
            if (response) {
                this.getDetails();
                this.handlemodal();
                this.setState({snackmsg: 'Updated Successfully', snackbar: true})
            }
        }).catch((err) => {
            if (err) {

              this.getDetails();
              //this.handleChildren();
              this.handlemodal();
                    }
        })
    }

    render() {
  var result = this.state.FilteredProducts.map((details, index) => {
      return (

<Table.Row key={index}>
              <Table.Cell>{details.categoryid}</Table.Cell>
              <Table.Cell>{details.subcategoryid}</Table.Cell>
              <Table.Cell>{details.brandid}</Table.Cell>
              <Table.Cell>{details.productid}</Table.Cell>
              <Table.Cell>{details.price}</Table.Cell>
              <Table.Cell>{details.discount}</Table.Cell>
              <Table.Cell>{details.quantity}</Table.Cell>
              <Table.Cell><Button   color='orange' onClick={() => this.handleupdate(details)}>Update</Button><Button   color='red' onClick= {()=>this.handledelete(details._id)}>Delete</Button>
              </Table.Cell>
</Table.Row>
      )
  });
      return (
            <div>
                <Header id='vendor-product-header'>Products Table</Header>
                <Table singleLine>
                    <Table.Header>
                        <Table.Row color='blue'>
                            <Table.HeaderCell>Category</Table.HeaderCell>
                            <Table.HeaderCell>SubCategory</Table.HeaderCell>
                            <Table.HeaderCell>Brand</Table.HeaderCell>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell>MRP</Table.HeaderCell>
                            <Table.HeaderCell>Discount</Table.HeaderCell>
                            <Table.HeaderCell>Quantity</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
  {this.state.FilteredProducts.length>0?<Table.Body>{result}</Table.Body>:<Table.Body><Table.Row id='VendorProductList-noproductmsg'> <Table.HeaderCell colSpan='8' textAlign='center'>Please Select A Product</Table.HeaderCell></Table.Row></Table.Body>}
                </Table>
                <Modal open={this.state.openmodal} onClose={this.handlemodal}>
                  <Modal.Header id='VendorProductList-Headerlabel'>
                    Edit Product
                  </Modal.Header>
                    <Modal.Content>
                      <Form id="VendorProductList-formbar" >
                      <Form.Group widths='equal' id="VendorProductList-modal">
                        <Form.Field   id="VendorProductList-error" >
                    <Form.Input label='Price'  icon='rupee' error={this.state.errorprice}  value={this.state.price}   onChange={this.handleprice}/>
                    {this.state.errorpricemsg}
                  </Form.Field>
                  <Form.Field
                      id="VendorProductList-error"> <Form.Input label='Discount'  icon='percent' error={this.state.errordiscount} value={this.state.discount}  onChange={this.handlediscount}  />
                {this.state.errordisMSG}    </Form.Field>
                <Form.Field id="VendorProductList-error">
                <Form.Input label='Quantity' error={this.state.errorquantity} type='number' min='0' value={this.state.quantity}  onChange={this.handlequantity}/>
                  {this.state.errorquantityMSG}
             </Form.Field>
           </Form.Group>
                </Form>
                <h5>Description</h5>
                <RichTextEditor  id="VendorProductList-rte" placeholder='Description' className='vendoraction-RichTextEditor' value={this.state.value} onChange={this.onChange}>{this.state.Description}</RichTextEditor>
                  </Modal.Content>
                    <Modal.Actions >
                        <Button  color='green' value='Update' disabled={this.state.errorprice || this.state.errorquantity || this.state.errordiscount} onClick={this.handleSubmit}>Update
                        </Button>
                        <Button  color='red' value='Cancel' onClick={this.handlemodal}>Cancel</Button>
                      </Modal.Actions>
                    </Modal>
                <Snackbar open={this.state.snackbar}  message={this.state.snackmsg} autoHideDuration={4000} onRequestClose={this.handleRequestClose}/>
            </div>
        );
    }
}
