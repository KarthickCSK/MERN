
import React, {PropTypes, Component} from 'react';
import style from './style.css'
import {
    Grid,
    Form,
    Button,
    Modal,
    Input,
    Message,
    Popup,
    Icon,
    Header,
    Dropdown,
    Label
} from 'semantic-ui-react';
import Axios from 'axios';
import validator from 'validator';
import component from '../VendorImageUpload'
import RichTextEditor from 'react-rte';
import Snackbar from 'material-ui/Snackbar';
import {Link, hashHistory} from 'react-router';
import ReactDOM from 'react-dom';

export default class VendorActions extends React.Component {
    constructor(props)
    {
        super(props)
        this.handleCategory = this.handleCategory.bind(this);
        this.handleSubcategory = this.handleSubcategory.bind(this);
        this.clearformData = this.clearformData.bind(this);
        this.handleproductName = this.handleproductName.bind(this);
        this.handlebrandName = this.handlebrandName.bind(this);
        this.handleMRP = this.handleMRP.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleDiscount = this.handleDiscount.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.addToDatabase = this.addToDatabase.bind(this);
        this.handleOtherCategorymodal = this.handleOtherCategorymodal.bind(this);
        this.handleOtherbrandnamemodal = this.handleOtherbrandnamemodal.bind(this);
        this.handleOthersubcategorymodal = this.handleOthersubcategorymodal.bind(this);
        this.CallDatabaseCategory = this.CallDatabaseCategory.bind(this);
        this.CallDatabaseSubCategory = this.CallDatabaseSubCategory.bind(this);
        this.CallDatabaseBrandName = this.CallDatabaseBrandName.bind(this);
        this.CallDatabaseProductName = this.CallDatabaseProductName.bind(this);
        this.handleremoveimageserver = this.handleremoveimageserver.bind(this);
        this.handleaddimageserver = this.handleaddimageserver.bind(this);
        this.handleuploadedImagescategory = this.handleuploadedImagescategory.bind(this);
        this.handleremoveImagescategory = this.handleremoveImagescategory.bind(this);
        this.handleuploadedImagessubcategory = this.handleuploadedImagessubcategory.bind(this);
        this.handleremoveImagessubcategory = this.handleremoveImagessubcategory.bind(this);
        this.handleerror = this.handleerror.bind(this);
        this.state = {
            category: '',
            subCategory: '',
            open: true,
            errorproductName: false,
            errorbrandName: false,
            errorMRP: false,
            errorDiscount: false,
            errorDescription: false,
            productName: '',
            brandName: '',
            MRP: '',
            Discount: '',
            Description: '',
            errorproductNameMSG: '',
            errorbrandNameMSG: '',
            errorMRPMSG: '',
            errorDiscountMSG: '',
            errorDescriptionMSG: '',
            openModal: false,
            errortoCompleteForm: true,
            errortoCompleteFormCat: true,
            errortoCompleteFormsubcat: true,
            quantity: '',
            errorquantity: false,
            errorquantityMSG: '',
            othercategory: '',
            othersubcategory: '',
            otherbrandName: '',
            otherCategoryModal: false,
            othersubcategoryModal: false,
            otherbrandNameModal: false,
            otherproductNameModal: false,
            categoryScroll: [
                {
                    text: 'Category Name',
                    value: 'Category Name'
                }
            ],
            SubCategoryScroll: [
                {
                    text: 'SubCategory Name',
                    value: 'SubCategory Name'
                }
            ],
            brandNameScroll: [
                {
                    text: 'Brand Name',
                    value: 'Brand Name'
                }
            ],
            productScroll: [
                {
                    text: 'Product Name ',
                    value: 'Product Name '
                }
            ],
            value: RichTextEditor.createEmptyValue(),
            openImageModal: false,

  openImageSubCategory: false,
            errorproductinput: false,
            errorcategoryinput: false,
            errorsubcategoryinput: false,
            errorbrandinput: false,
            errormsgcategory: '',
            errormsgsubcategory: '',
            errormsgbrand: '',
            errormsgproduct: '',
            shopScroll: [],
            shopObjectId: '',
            snackbar: false,
            change: '',
            disable: false,
            message: '',
            errordisMSG: '',
            snackbaralready: false,
            snackbarmsg: '',
            imagedata: [],
            errorshop: true,
            errortoCompleteFormproductname: true,
            erroraddedproduct: true,
            erroraddedcategory: true,
            erroraddedbrand: true,
            erroraddedsubcategory: true,
            disablesubcategorydropdown: true,
            disableproductdropdown: true,
            disablebranddropdown: true,
            uploadedImagescategory: [],
            uploadedImagessubcategory: [],
            errortocompleteimage: false
        }

        // on component mount this will populate all the vendors shop and the subcategory in the database
        Axios.get('/SaveShop/showshop').then(function(response) {
            //    console.log(response.data)
            let value = response.data;
            Axios.get('/vendor/ShowCategory').then(function(response) {
                this.setState({categoryScroll: response.data})
            }.bind(this)).catch(function(error) {
                //console.log(error);
                if (error) {}
            });
            if (value.length === 0) {
                this.setState({disable: true, shopScroll: this.state.Other, message: 'First Add A Shop'})
            } else {
                this.setState({shopScroll: response.data, disable: false, message: ''})
            }
        }.bind(this)).catch(function(error) {
            console.log(error)
        }.bind(this))
    }

    // RichTextEditor propTypes  values and function
    static propTypes = {
        onChange: PropTypes.func
    };

    // handle snackbar for checking for already present
    AlreadyPresent = () => {
        const snackbar = this.refs.snackbaralready;
        const node = ReactDOM.findDOMNode(snackbar);
        node.className = "show";
        setTimeout(function() {
            node.className = node.className.replace("show", "");
        }, 1500);
    }
    // handle success snackbar
    Success = () => {
        const snackbar = this.refs.snackbar;
        const node = ReactDOM.findDOMNode(snackbar);
        node.className = "show";
        setTimeout(function() {
            node.className = node.className.replace("show", "");
        }, 1500);
    }
    // handle the error on the page
    handleerror = () => {
        const snackbar = this.refs.snackbarerror;
        const node = ReactDOM.findDOMNode(snackbar);
        node.className = "show";
        setTimeout(function() {
            node.className = node.className.replace("show", "");
        }, 1500);
    }
    PleaseUploadImage = () => {
        const snackbar = this.refs.snackbarupload;
        const node = ReactDOM.findDOMNode(snackbar);
        node.className = "show";
        setTimeout(function() {
            node.className = node.className.replace("show", "");
        }, 1500);
    }

    onChange = (value) => {
        this.setState({value});
        //    console.log(value.toString('html'));
        if (this.props.onChange) {
            // Send the changes up to the parent component as an HTML string.
            // This is here to demonstrate using `.toString()` but in a real app it
            // would be better to avoid generating a string on each change.
            this.props.onChange(value.toString('html'));
        }
    };

    // state set of the category selected in dropdown  menu
    handleCategory = (e, data) => {
        let response;
        if (data.value.trim() === 'Other') {
            this.setState({otherCategoryModal: true, categoryimageuploadbutton: false})
        } else {
            Axios.post('/vendor/ShowSubCategory', {category: data.value}).then(function(response) {
                this.setState({SubCategoryScroll: response.data, disablesubcategorydropdown: false})
            }.bind(this)).catch(function(error) {
                this.handleerror();
            }.bind(this));
            this.setState({category: data.value, errortoCompleteFormCat: false})
        }
    }
    // state set of the subCategory selected in dropdown menu
    handleSubcategory = (e, data) => {
        e.preventDefault();

        if (data.value === 'Other') {
            this.setState({othersubcategoryModal: true})
        } else {
            Axios.post('/vendor/showbrand', {subcategory: data.value}).then(function(response) {
                this.setState({brandNameScroll: response.data, disablebranddropdown: false})
            }.bind(this)).catch(function(error) {
                this.handleerror();
            }.bind(this));
            this.setState({subCategory: data.value, errortoCompleteFormsubcat: false})
        }
    }
    // handle the productName with validation
    handleproductName = (e, data) => {
        e.preventDefault();
        this.setState({productName: data.value})
        if (data.value === "Other") {
            this.setState({otherproductNameModal: true});
        } else {
            if (validator.isAlphanumeric(this.state.productName)) {
                this.setState({errorproductName: false, errorproductNameMSG: ''});
            } else {
                this.setState({errorproductNameMSG: true});
            }
        }
    }
    // handle the brandName with validation
    handlebrandName = (e, data) => {
        e.preventDefault();
        if (data.value == 'Other') {
            this.setState({otherbrandNameModal: true})
        } else {
            Axios.post('/vendor/showproduct', {
                brandname: data.value,
                subcategoryname: this.state.subCategory
            }).then(function(response) {
                this.setState({productScroll: response.data, disableproductdropdown: false})
            }.bind(this)).catch(function(error) {
                this.handleerror();
            }.bind(this));
            this.setState({brandName: data.value, errortoCompleteFormbrand: false})
        }
    }

    // handle the MRP with validation
    handleMRP = (e, data) => {
        e.preventDefault();
        let value = data.value.trim()
        if (validator.isFloat(value) && (!validator.isEmpty(value))) {
            this.setState({errorMRP: false, errorMRPMSG: '', errortoCompleteFormproductname: false});
        } else {
            this.setState({errorMRP: true, errorMRPMSG: 'PLease Enter  Only Number'});
        }
        this.setState({MRP: value})
    }

    // handle the Discount with validation
    handleDiscount = (e, data) => {
        e.preventDefault();

        let value = data.value.trim();
        if (validator.isFloat(value, [
            {
                max: 100,
                min: 0
            }
        ])) {
            if ((value > 0) && (value < 100) && (value.length <= 2)) {
                this.setState({errorDiscount: false, errordisMSG: '', errortoCompleteForm: false, errortoCompleteFormproductname: false});
            } else {
                this.setState({errorDiscount: true, errordisMSG: 'Enter Discount Between 0 And 99', errortoCompleteForm: true})
            }
        } else {
            this.setState({errorDiscount: true, errordisMSG: 'Enter Discount Between 1 And 99'});
        }
        this.setState({Discount: value})
    }
    // handle the Description with validation
    handleDescription = (e, data) => {
        e.preventDefault();
        this.setState({Description: data.value, errortoCompleteForm: false})
    }
    // handle the quantity of the product
    handleQuantity = (e, data) => {
        e.preventDefault();
        let value = data.value.trim();
        if ((validator.isNumeric(value) && (!validator.isEmpty(value)))) {
            this.setState({errorquantity: false, errorquantityMSG: '', errortoCompleteFormproductname: false})
        } else {
            this.setState({errorquantity: true, errorquantityMSG: 'Quantity Greater Than 10'})
        }
        this.setState({quantity: value, errorquantityMSG: ''})
    }

    // set state of the modal open and close of the product add view of the vendor
    handleModal()
    {
        //  e.preventDefault();
        if (this.state.openModal) {
            this.setState({openModal: false})
        } else {
            this.setState({openModal: true})
        }
    }

    imageModalSubCategory = () => {
        if (this.state.openImageModalSubCategory) {
            this.setState({openImageModalSubCategory: false})
        } else {
            this.setState({openImageModalSubCategory: true})
        }
    }

    // clear the formdata as soon reset button  is clicked
    handleCancel = () => {
        this.setState({
            openModal: false,
            othercategoryname: '',
            category: '',
            subCategory: '',
            productName: '',
            brandName: '',
            Discount: '',
            MRP: '',
            Description: '',
            quantity: '',
            productScroll: [
                {
                    text: 'Product Name',
                    value: 'Product Name'
                }
            ],
            SubCategoryScroll: [
                {
                    text: 'Product Name',
                    value: 'Product Name'
                }
            ],
            brandNameScroll: [
                {
                    text: 'Product Name',
                    value: 'Product Name'
                }
            ],
            errortoCompleteForm: true,
            errortoCompleteFormCat: true,
            errortoCompleteFormbrand: true,
            errortoCompleteFormproductname: true,
            errortoCompleteFormsubcat: true,
            disablebranddropdown: true,
            disablesubcategorydropdown: true,
            disableproductdropdown: true
        })
    }
    // clear the states of data present in the form
    clearformData()
    {
        this.setState({
            othercategoryname: '',
            category: '',
            subCategory: '',
            productName: '',
            brandName: '',
            Discount: '',
            MRP: '',
            Description: '',
            quantity: '',
            imagedata: [],
            uploadedImagescategory: [],
            uploadedImagessubcategory: [],
            productScroll: [
                {
                    text: 'Product Name',
                    value: 'Product Name'
                }
            ],
            SubCategoryScroll: [
                {
                    text: 'Subcategory Name',
                    value: 'Subcategory Name'
                }
            ],
            brandNameScroll: [
                {
                    text: 'Brand Name',
                    value: 'Brand Name'
                }
            ],
            errortoCompleteForm: true,
            errortoCompleteFormCat: true,
            errortoCompleteFormbrand: true,
            errortoCompleteFormproductname: true,
            errortoCompleteFormsubcat: true,
            disablebranddropdown: true,
            disablesubcategorydropdown: true,
            disableproductdropdown: true,
            erroraddedbrand: true,
            erroraddedproduct: true,
            erroraddedsubcategory: true,
            erroraddedcategory: true,

        })
    }
    // add the porduct to the database through Axios call to database
    addToDatabase = () => {
        let obj = {};
        obj.shopObjectId = this.state.shopObjectId;
        obj.productName = this.state.productName;
        obj.brandName = this.state.brandName;
        obj.MRP = this.state.MRP;
        obj.Discount = this.state.Discount;
        obj.Description = this.state.value.toString('html');
        obj.category = this.state.category;
        obj.subCategory = this.state.subCategory;
        obj.quantity = this.state.quantity;
        obj.imageurl = "";
            // add to database and refersh all the states present in the database
        Axios.post('/vendor/SaveCatalogue', {data: obj}).then(function(response) {
                if (response.data === "Add Successfull") {
                    this.handleRefresh();
                    this.Success();
                    this.setState({
                        openModal: false,
                        SubCategoryScroll: [
                            {
                                text: 'SubCategory',
                                value: 'SubCategory'
                            }
                        ],
                        productScroll: [
                            {
                                text: 'Product Name',
                                value: 'Product Name'
                            }
                        ],
                        brandNameScroll: [
                            {
                                text: 'Brand Name',
                                value: 'Brand Name'
                            }
                        ],
                        categoryScroll: [
                            {
                                text: 'Product Name',
                                value: 'Product Name'
                            }
                        ],
                        MRP: '',
                        productName: '',
                        Discount: '',
                        quantity: '',
                        Description: '',
                        snackbarmsg: '',
                        errortoCompleteForm: true,
                        errortoCompleteFormCat: true,
                        errortoCompleteFormbrand: true,
                        errortoCompleteFormproductname: true,
                        errortoCompleteFormsubcat: true,
                        disablebranddropdown: true,
                        disablesubcategorydropdown: true,
                        disableproductdropdown: true,
                        erroraddedbrand: true,
                        erroraddedsubcategory: true,
                        erroraddedproduct: true,
                        erroraddedcategory: true,
                        imagedata: [],
                        uploadedImagescategory: [],
                        uploadedImagessubcategory: []
                    })
                } else {
                    this.AlreadyPresent();
                    this.setState({openModal: false})
                }
            }.bind(this)).catch(function(error) {
                this.handleerror();
            }.bind(this));
            }

    // handle category modal window set the values of the state
    handleOtherCategorymodal(e)
    {
        e.preventDefault();
        e.stopPropagation();
        if (this.state.otherCategoryModal) {
            Axios.get('/vendor/ShowCategory').then(function(response) {
                //  console.log(response.data);
                this.setState({categoryScroll: response.data, otherCategoryModal: false})
            }.bind(this)).catch(function(error) {
                this.handleerror();
            }.bind(this))
        } else {
            this.setState({otherCategoryModal: true})
        }
    }
    // handle the other subcategory modal window  and set the other category state
    handleOthersubcategorymodal(e)
    {
        e.stopPropagation();
        if (this.state.othersubcategoryModal) {
            this.setState({othersubcategoryModal: false})
        } else {
            this.setState({othersubcategoryModal: true})
        }
    }
    // handle other brandname not present in the database and set the state of brandname
    handleOtherbrandnamemodal(e)
    {
        e.stopPropagation();
        if (this.state.otherbrandNameModal) {
            this.setState({otherbrandNameModal: false})
        } else {
            this.setState({otherbrandNameModal: true})
        }
    }
    //handle the other product model
    handleOtherproductnamemodal = (e) => {
        e.stopPropagation();
        if (this.state.otherproductNameModal) {
            this.setState({otherproductNameModal: false})
        } else {
            this.setState({otherproductNameModal: true})
        }
    }

    // send a Axios call and save other category name as soon as add category is clicked on add category Modal
    CallDatabaseCategory(e) {
        e.stopPropagation();
        console.log(this.state.uploadedImagescategory);
        Axios.post('/vendor/AddNewCategory', {othercategory: this.state.category,categoryimage:this.state.uploadedImagescategory}).then(function(response) {
            if (response.data == "Added Successfully") {
                this.handleRefresh();
                this.Success();
                this.setState({otherCategoryModal: false, disablesubcategorydropdown: false,uploadedImagescategory:[],erroraddedcategory:true})
            } else {
                this.AlreadyPresent();
                this.setState({otherCategoryModal: false,uploadedImagescategory:[],erroraddedcategory:true})
            }
        }.bind(this)).catch(function(error) {
            if (error)
                console.log(error);
            }
        .bind(this))
    }

    // send a Axios call and save other Subcategory name as soon as add Subcategory is clicked on add Subcategory Modal
    CallDatabaseSubCategory() {
        Axios.post('/vendor/AddNewSubCategory', {
            othersubcategory: this.state.subCategory,
            category: this.state.category,
            subcategoryimageurl:this.state.uploadedImagessubcategory
        }).then(function(response) {
            if (response.data == "Added A New Subcategory") {
                this.handleRefreshSubCategory();
                this.Success();
                this.setState({othersubcategoryModal: false, disablebranddropdown: false, imageuploadsubcategorybutton: false,uploadedImagessubcategory:[],erroraddedsubcategory:true})
            } else {
                this.handleRefreshSubCategory();
                this.AlreadyPresent();
                this.setState({othersubcategoryModal: false, disablebranddropdown: false,uploadedImagessubcategory:[],erroraddedsubcategory:true})
            }
        }.bind(this)).catch(function(error) {
            this.handleerror();
        }.bind(this))
    }
    // send a Axios call and save other brandName name as soon as add category is clicked on add other brandName Modal
    CallDatabaseBrandName() {
        Axios.post('/vendor/AddNewBrand', {
            otherbrandname: this.state.brandName,
            subcategory: this.state.subCategory
        }).then(function(response) {
            if (response.data == 'Added A New Brand') {
                this.handleRefreshbrandName();
                this.Success();
                this.setState({otherbrandNameModal: false, disableproductdropdown: false,erroraddedbrand:true})
            } else {
                this.handleRefreshbrandName();
                this.AlreadyPresent();
                this.setState({otherbrandNameModal: false, disableproductdropdown: false,erroraddedbrand:true})
            }
        }.bind(this)).catch(function(error) {
            this.handleerror();
        }.bind(this))
    }

    //  send a axios call to the database and add the new product number to the database
    CallDatabaseProductName() {
        Axios.post('/vendor/AddNewProduct', {
            otherproductname: this.state.productName,
            brand: this.state.brandName,
            subcategory: this.state.subCategory,
            productimage:this.state.imagedata
        }).then(function(response) {
            if (response.data == 'Added A New Product') {
                this.handleRefreshProductName();
                this.Success();
                this.setState({otherproductNameModal: false, imageuploadproductbutton: false,imagedata:[],erroraddedproduct:true})
            } else {
                this.handleRefreshProductName();
                this.AlreadyPresent();
                this.setState({otherproductNameModal: false,imagedata:[],erroraddedproduct:true})
            }
        }.bind(this)).catch(function(error) {
            this.handleerror();
        }.bind(this))
    }

    imageModal = () => {
        if (this.state.openImageModal) {
            this.setState({openImageModal: false})
        } else {
            this.setState({openImageModal: true})
        }
    }

    // check for validations in the added category
    AddedCategory = (e, data) => {
        e.preventDefault();
        e.stopPropagation();
        let value = data.value.trim();
        this.setState({category:value, erroraddedcategory: false})
        if ((!validator.isEmpty(value))&&this.state.uploadedImagescategory.length>0) {
            this.setState({errorcategoryinput: false, errormsgcategory: ''})
        } else {
            this.setState({errorcategoryinput: true, errormsgcategory: 'Category and Upload Image Cannot Be Empty'})
        }
    }
    // check for validations in subCategory Added
    AddedSubCategory = (e, data) => {
        e.preventDefault();
        let value = data.value.trim();
        //  console.log(value);
        this.setState({subCategory: value, erroraddedsubcategory: false})
        if ((!validator.isEmpty(value))&&this.state.uploadedImagessubcategory.length>0) {
            this.setState({errorsubcategoryinput: false, errormsgsubcategory: '', subCategory: value})
        } else {
            this.setState({errorsubcategoryinput: true, errormsgsubcategory: 'SubCategory and Upload Image cannot be empty', subCategory: ''})
        }
    }

    // check the validation of the added brand through the modal
    AddedBrand = (e, data) => {
        e.preventDefault();
        let value = data.value.trim()
        this.setState({brandName: value, erroraddedbrand: false})
        if ((!validator.isEmpty(value))) {
            this.setState({errorbrandinput: false, errormsgbrand: ''})
        } else {
            this.setState({errorbrandinput: true, errormsgbrand: 'Brand Name Cannot Be Empty'})
        }
    }
    // check the validation for added product into the database
    AddedProduct = (e, data) => {
        e.preventDefault();
        let value = data.value.trim()
        this.setState({productName: value, erroraddedproduct: false})
        if ((!validator.isEmpty(value))) {
            this.setState({errorproductinput: false, errormsgproduct: ''})
        } else {
            this.setState({errorproductinput: true, errormsgproduct: 'ProductName and Upload Image Cannot Be Empty'})
        }
    }
    // send to databse the object id of shop to work save a database
    AddShop = (e, data) => {
        e.preventDefault();

        this.setState({shopObjectId: data.value, errorshop: false})
    }

    // function called when a product is added to the database and refresh the category scroll
    handleRefresh = () => {
        Axios.get('/SaveShop/showshop').then(function(response) {
            Axios.get('/vendor/ShowCategory').then(function(response) {
                this.setState({categoryScroll: response.data})
            }.bind(this)).catch(function(error) {
                this.handleerror();
            }.bind(this));
            this.setState({shopScroll: response.data})
        }.bind(this)).catch(function(response) {
            this.handleerror();
        }.bind(this))
    }

    // handle the refresh when  a new subcategory is added the the database
    handleRefreshSubCategory = () => {
        //    console.log("refresh calleed")
        Axios.post('/vendor/ShowSubCategory', {category: this.state.category}).then(function(response) {
            this.setState({SubCategoryScroll: response.data})
        }.bind(this)).catch(function(error) {
            this.handleerror()
        }.bind(this))

    }

    handleRefreshbrandName = () => {
        //  console.log("refresh called")
        Axios.post('/vendor/showbrand', {subcategory: this.state.subCategory}).then(function(response) {
            //     console.log(response.data);
            this.setState({brandNameScroll: response.data})
        }.bind(this)).catch(function(error) {
            this.handleerror();
        }.bind(this));
    }

    // refresh the dropdoen when a new prodcut is added to the database
    handleRefreshProductName = () => {
        Axios.post('/vendor/showproduct', {
            brandname: this.state.brandName,
            subcategoryname: this.state.subCategory
        }).then(function(response) {
            this.setState({productScroll: response.data})
        }.bind(this)).catch(function(error) {
            this.handleerror();
        }.bind(this));

    }

    //adding the image at server
    handleaddimageserver(imgarr)
    {

        imgarr.forEach((item) => {

            this.state.imagedata.push(item)
        })
        this.setState({imagedata: this.state.imagedata})
    }

    //removing image at server
    handleremoveimageserver(filename, index)
    {
        var imagearray = this.state.imagedata
        Axios.post('/uploadimage/deletefromserver', {imagename: filename}).then((response) => {
            imagearray.splice(index, 1)
            this.setState({imagedata: imagearray})
        }).catch((err) => {
            if (err)
                this.handleerror();
            }
        )
    }
    handleuploadedImagescategory(data)
    {
      console.log(data)
        this.setState({uploadedImagescategory: data})
    }
    handleremoveImagescategory(filename)
    {
        Axios.post('/uploadimage/deletefromservercategory', {imagename: filename}).then((response) => {

            this.setState({uploadedImagescategory: []})
        }).catch((err) => {
            if (err)
                this.handleerror();
            }
        )
    }
    handleuploadedImagessubcategory(data)
    {

        this.setState({uploadedImagessubcategory: data})

    }
    handleremoveImagessubcategory(filename)
    {
        Axios.post('/uploadimage/deletefromserversubcategory', {imagename: filename}).then((response) => {
            this.setState({uploadedImagessubcategory: []})
        }).catch((err) => {
            if (err)
                this.handleerror();
            }
        )
    }
    //TODO here the categoryOptions and the productOptions array should be updated from the database
    render()
    {
        return (
            <div style={style.display}>
                <Grid columns={3}>
                    <Grid.Column id='vendoraction-emptybar'></Grid.Column>
                    <Grid.Column>
                        <Header style={{marginBottom:'25px'}}>Add Products</Header>
                        <Grid >
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <h5>Select Shop</h5>
                                    <Dropdown basic label="Select Shop" fluid selection options={this.state.shopScroll} onChange={this.AddShop} name='Select Shop' noResultsMessage='Add A Shop' disabled={this.state.disable}/>
                                </Grid.Column>
                            </Grid.Row>
                            {this.state.disable
                                ? <p id="vendoraction-pre" >{this.state.message}<Link to='/addshop' id= "vendoraction-shoplink">Click here!</Link></p>
                                : null}
                        </Grid>
                        <Grid >
                            <Grid.Row id='vendoraction-fields'>
                                <Grid.Column width={16}>
                                    <h5>Category</h5>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row id='vendoractions-mainfield'>
                                <Grid.Column width={12}>
                                    <Dropdown basic required label='Category' fluid selection options={this.state.categoryScroll} placeholder='Category' onChange={this.handleCategory} search noResultsMessage='Category'/>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Button value="Other" color='orange' onClick={this.handleCategory} basic>Other</Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Grid >
                            <Grid.Row  id='vendoraction-fields'>
                                <Grid.Column>
                                    <h5>SubCategory</h5>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row id='vendoractions-mainfield'>
                                <Grid.Column width={12}>
                                    <Dropdown basic disabled={this.state.disablesubcategorydropdown} required label='SubCategory' fluid selection options={this.state.SubCategoryScroll} placeholder='SubCategory' onChange={this.handleSubcategory} noResultsMessage='SubCategory' search/>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Button value="Other" disabled={this.state.disablesubcategorydropdown} color='orange' onClick={this.handleSubcategory} basic>Other</Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Grid columns='equal'>
                            <Grid.Row id='vendoraction-fields'>
                                <Grid.Column>
                                    <h5>Brand</h5>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row id='vendoractions-mainfield'>
                                <Grid.Column width={12}>
                                    <Dropdown basic required fluid selection label='Brand Name' name='Brand Name' disabled={this.state.disablebranddropdown} options={this.state.brandNameScroll} placeholder='Brand Name' onChange={this.handlebrandName} noResultsMessage='Brand Name' search/>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Button value="Other" disabled={this.state.disablebranddropdown} color='orange' onClick={this.handlebrandName} basic>Other</Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Grid columns='equal'>
                            <Grid.Row  id='vendoraction-fields'>
                                <Grid.Column>
                                    <h5>Product</h5>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row id='vendoractions-mainfield'>
                                <Grid.Column width={12}>
                                    <Dropdown basic required fluid selection label='Product Name' name='Product Name' disabled={this.state.disableproductdropdown} placeholder='Product Name' onChange={this.handleproductName} options={this.state.productScroll} noResultsMessage='Product Name' search/>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Button value="Other" color='orange' onClick={this.handleproductName} disabled={this.state.disableproductdropdown} basic>Other</Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <br/>
                        <Grid >
                            <Grid.Row id='vendoraction-inputbar'>
                                <Grid.Column width={5}>
                                    <Input id='vendoraction-input' placeholder='MRP' icon='rupee' error={this.state.errorMRP} onChange={this.handleMRP}/>
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <Input id='vendoraction-input' placeholder='Quantity' type='number' min='0' error={this.errorquantity} onChange={this.handleQuantity}/>
                                </Grid.Column>
                                <Grid.Column width={6}>
                                    <Input id='vendoraction-input' icon='percent' error={this.state.errorDiscount} placeholder='Discount' onChange={this.handleDiscount}/>
                                </Grid.Column>
                            </Grid.Row>
                            <p id='vendoraction-pre'>{this.state.errorquantityMSG} {this.state.errorMRPMSG}
                                {this.state.errordisMSG}
                                {this.state.errortoCompleteForm}
                            </p>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column>
                    </Grid.Column>
                </Grid>

                <Grid>
                    <Grid.Row>
                      <Grid.Column width={3}></Grid.Column>
                      <Grid.Column width={10}>
                        <h5>Description</h5>
                        <RichTextEditor placeholder='Description' className='vendoraction-RichTextEditor' value={this.state.value} onChange={this.onChange}/>
                        <Modal size="small" open={this.state.openModal} onClose={this.handleModal}>
                            <Modal.Content>
                                Are you sure to submit?
                            </Modal.Content>
                            <Modal.Actions id='vendoraction-modalaction'>
                                <Button color='green' onClick={this.addToDatabase}>OK</Button>
                                <Button color='red' onClick={this.handleCancel}>Cancel</Button>
                            </Modal.Actions>
                        </Modal>
                        <Modal size='small' open={this.state.otherCategoryModal} onClose={this.handleOtherCategorymodal}>
                            <Modal.Header id='VendorActions-Headerlabel'>
                                Add Category</Modal.Header>
                            <Modal.Content>
                                  <component.CategoryImageUpload categoryid={this.state.category.toLowerCase()} handlemodal={this.imageModalcategory} uploadedImagescategory={this.state.uploadedImagescategory} handleuploadedImagescategory={this.handleuploadedImagescategory} handleremoveImagescategory={this.handleremoveImagescategory}/>
                                <Input id='vendoraction_inputcss' ref='othercategory' placeholder='Add Category' error={this.state.errorcategoryinput} onChange={this.AddedCategory}/>
                                <p id='vendoraction-pre' >{this.state.errormsgcategory}</p>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={this.CallDatabaseCategory} disabled={this.state.errorcategoryinput || this.state.erroraddedcategory} color='green'>Add Category</Button>
                            </Modal.Actions>
                        </Modal>
                        <Modal size='small' open={this.state.othersubcategoryModal} onClose={this.handleOthersubcategorymodal}>
                            <Modal.Header id='VendorActions-Headerlabel'>
                                Add SubCategory
                            </Modal.Header>
                            <Modal.Content>
                                <component.SubCategoryImageUpload handlemodal={this.imageModalSubCategory} uploadedImagessubcategory={this.state.uploadedImagessubcategory} handleuploadedImagessubcategory={this.handleuploadedImagessubcategory} handleremoveImagessubcategory={this.handleremoveImagessubcategory}/>
                                <Input id='vendoraction_inputcss'  placeholder='Add SubCategory' name='SubCategory' error ={this.state.errorsubcategoryinput} onChange={this.AddedSubCategory}/>
                                <p id='vendoraction-pre'>{this.state.errormsgsubcategory}</p>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={this.CallDatabaseSubCategory} disabled={this.state.errorsubcategoryinput || this.state.erroraddedsubcategory} color="green">Add SubCategory</Button>
                            </Modal.Actions>
                        </Modal>
                        <Modal size='small' open={this.state.otherbrandNameModal} onClose={this.handleOtherbrandnamemodal}>
                            <Modal.Header id='VendorActions-Headerlabel'>
                                Add Brand Name</Modal.Header>
                            <Modal.Content>
                                <Input placeholder='Add Brand Name' name=' brandName' error={this.state.errorbrandinput} onChange={this.AddedBrand}/>
                                <p id='vendoraction-pre'>{this.state.errormsgbrand}</p>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={this.CallDatabaseBrandName} disabled={this.state.errorbrandinput || this.state.erroraddedbrand} color="green">Add Brand Name</Button>
                            </Modal.Actions>
                        </Modal>
                        <Modal size='small' open={this.state.otherproductNameModal} onClose={this.handleOtherproductnamemodal}>
                            <Modal.Header id='VendorActions-Headerlabel'>
                              Add Product Name</Modal.Header>
                            <Modal.Content>
                              <Input placeholder='Add Product Name' error={this.state.errorproductinput} onChange={this.AddedProduct} name='Product Name'/>
                              <p id='vendoraction-error'>{this.state.errormsgproduct}</p>
                              <component.ImageUpload handlemodal={this.imageModal} handleremoveimageserver={this.handleremoveimageserver} handleaddimageserver={this.handleaddimageserver} imagedata={this.state.imagedata}/>
                                </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={this.CallDatabaseProductName} disabled={this.state.errorproductinput || this.state.erroraddedproduct} color="green">Add Product Name</Button>
                            </Modal.Actions>
                        </Modal>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row id='vendoraction-final'>
                      <Grid.Column width={7}></Grid.Column>
                      <Grid.Column width={5}>
                        <Button.Group id='vendoraction-buttongroup'>
                            <Button color='green' disabled={this.state.errorDiscount || this.state.errorMRP || this.state.errorquantity || this.state.errorshop || this.state.errortoCompleteFormCat || this.state.errortoCompleteFormsubcat || this.state.errortoCompleteFormbrand || this.state.errortoCompleteFormproductname || this.state.errortoCompleteForm} onClick={this.handleModal}>Submit</Button>
                            <Button id='vendoraction-resetButton' color='red' onClick={this.clearformData} type='reset'>Reset</Button>
                        </Button.Group>
                      </Grid.Column>
                      <Grid.Column width={4}></Grid.Column>
                        <div ref='snackbaralready' id='snackbar'>
                            Already Added
                        </div>
                        <div ref='snackbar' id='snackbar'>
                            Added Successfully
                        </div>
                        <div ref='snackbarerror' id='snackbar'>
                            Error
                        </div>
                        <div ref='snackbarupload' id='snackbar'>
                            Please Upload Images
                        </div>
                      <Grid.Column width={3}></Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}
