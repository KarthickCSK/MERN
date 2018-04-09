import React from 'react';
import {Dropdown,Segment,Divider,Input,Form,Button,Grid} from 'semantic-ui-react';
import axios from 'axios';
import style from './vendorfinalfilter.css';

//import Category from '../Category';
import VendorProductList from './VendorProductList';
import {hashHistory} from 'react-router';
import queryString from 'query-string';
import AutoComplete from 'material-ui/AutoComplete';

import {orange500, blue500, redA700} from 'material-ui/styles/colors';
const styles = {
  errorStyle: {
    color: redA700,
  },
  underlineStyle: {
    borderColor: redA700,
  },
  floatingLabelStyle: {
    color: redA700,
  },
  floatingLabelFocusStyle: {
    color: redA700,
  },
};
export default class VendorFinalfilter extends React.Component
{

  constructor(props)
  {
    super(props)
    this.state={
      dataSource: [],
      category:[],
      subcategory:[],
      brands:[],
      discount:[],
      cat:"",
      subcat:"",
      brand:"",
      opencomponent:false,
      data:[],
      openFilter:false,
      openProductList:false,/*Conditional rendering for childComponent productList*/
      selectvalue:0,
      open:false,
      currentShopID:'',
      hideCategory:true,
      searchbardata:['no data found'],
      formData:{}
    }
  }
  componentDidMount()
  {
    this.setState({currentShopID:this.props.location.query.sid},()=>{

    axios.post('/userAction/showProductlist',{shopID:this.state.currentShopID}).then((response)=>
    {

      var data=[]
      response.data.map((item)=>
      {
        data.push(item._id)
      })
      this.setState({searchbardata:data})
    }).catch((err)=>
    {
        console.log(err)
    })
    axios.post('/filter/showCatalogue',{shopID:this.state.currentShopID}).then((response)=>
    {
      var category=[];
      var i=0;
      response.data.map((item)=>
      {
        var obj={};
        obj.text=item._id;
        obj.value=item._id;
        obj.key=i;
        i++;
        category.push(obj)
      })
      this.setState({category:category})
      this.handlediscountchange()
    }).catch((error)=>
    {
    console.log(error)
    })
    })

  }
  handleCategory=(e,data)=>
  {
    var subcategory=[];
    axios.post('/filter/showSubCategory',{data:[data.value,this.state.currentShopID]}).then((response)=>
    {
      var i=0;
      var dropdowndata = response.data.map((item)=>
        {
          var obj={};
          obj.text=item._id;
          obj.value=item._id;
          obj.key=i;
          i++;
          subcategory.push(obj)
        })
      this.setState({cat:data.value,subcategory:subcategory});
      this.handlediscountchange();
    }).catch((error)=>
    {
      console.log(error)
    });
  }
  handleSubcategory=(e,data)=>
  {
    axios.post('/filter/getbrands',{data:[this.state.currentShopID,this.state.cat,data.value]}).then((response)=>
    {
      var brands=[];
      var i=0;
      var dropdowndata = response.data.map((item)=>
      {
        var obj={};
        obj.text=item._id;
        obj.value=item._id;
        obj.key=i;
        i++;
        brands.push(obj)
      })
      this.setState({brands:brands,subcat:data.value})
      this.handlediscountchange()
    }).catch((error)=>
    {
      console.log(error)
    })
  }
  handleBrands=(e,data)=>
  {
    this.setState({brand:data.value})
    this.handlediscountchange()
  }
  handlediscountchange=()=>
  {
    axios.post('/filter/getdiscounts',{data:[this.state.currentShopID,this.state.cat,this.state.subcat,this.state.brand]}).
    then((response)=>
    {
      var i=0;
      var discount=[]
      response.data.map((item)=>
      {
        var obj={};
        obj.text=item._id;
        obj.value=item._id;
        obj.key=i;
        i++;
        discount.push(obj)
      })
      this.setState({discount:discount})
    }
    ).catch((error)=>
    {
      console.log(error)
    })
  }
  handleSubmit=(e,value)=>
  {
    //this.setState({hideCategory:false});
    e.preventDefault()
    //this.state.open=false;
    delete value.formData["Category-search"]
    delete value.formData["Brand-search"]
    delete value.formData["discount-search"]
    delete value.formData["SubCategory-search"]
    if(value.formData.priceFrom===""&&value.formData.priceTo==="")
    {
      value.formData["shopID"]=this.state.currentShopID;
      //this.setState({opencomponent:true,data:value.formData})
      if(value.formData.Category==""&&value.formData.SubCategory==""&&value.formData.Brand==""&&value.formData.discount=="")
      {
        this.state.selectvalue=0;
      }
      if(value.formData.Category!="")
      {
        this.state.selectvalue=this.state.selectvalue+1;
      }
      if(value.formData.SubCategory!="")
      {
        this.state.selectvalue=this.state.selectvalue+2;
      }
      if(value.formData.Brand!="")
      {
        this.state.selectvalue=this.state.selectvalue+4
      }
      if(value.formData.discount!="")
      {
        this.state.selectvalue=this.state.selectvalue+8
      }
      value.formData["QueryDecide"]=this.state.selectvalue
      this.state.selectvalue=0;
      this.setState({openFilter:true,formData:value.formData,openProductList:true})
      //this.setState({data:value.formData,opencomponent:true})
      //const path = '/ProductList?'+$.param(value.formData);
      //console.log(value.formData)
      //hashHistory.push(path);
    }
    else
    {
    let min =parseFloat(value.formData.priceFrom);
    let max = parseFloat(value.formData.priceTo);
    value.formData.priceFrom=parseFloat(min)
    value.formData.priceTo=parseFloat(max)
      if(max>min&&max>0&&min>0)
      {
        value.formData["shopID"]=this.state.currentShopID;

        if(value.formData.Category!="")
        {
          this.state.selectvalue=this.state.selectvalue+1;
        }
        if(value.formData.SubCategory!="")
        {
          this.state.selectvalue=this.state.selectvalue+2;
        }
        if(value.formData.Brand!="")
        {
          this.state.selectvalue=this.state.selectvalue+4
        }
        if(value.formData.discount!="")
        {
          this.state.selectvalue=this.state.selectvalue+8
        }
        this.state.selectvalue=this.state.selectvalue+16
        value.formData["QueryDecide"]=this.state.selectvalue
        this.state.selectvalue=0;
        this.setState({openFilter:true,formData:value.formData,openProductList:true})

      }
      else
      {
        this.setState({open:true})
      }
    }
  }
  handlesearchbar=(chosenRequest)=>
  {
    var obj={};
        obj.productid=chosenRequest;
        obj.QueryDecide=32;
        this.setState({formData:obj})
    this.setState({openFilter:true,openProductList:true})
  }
  render()
  {
  return(
    <div className="vendorfilter-product-form">
      <Grid className='vendorfiter-product-container'>
        <Grid.Column width={3}>
          <div className='vendorfilter-product-tool'>
            <Form onSubmit={this.handleSubmit} className='vendorfilter-product-type'>
              <Form.Select name='Category' search options={this.state.category} placeholder='select category' onChange={this.handleCategory} />
              <Form.Select name='SubCategory' search options={this.state.subcategory} placeholder='select subcategory' onChange={this.handleSubcategory} />
              <Form.Select name='Brand' options={this.state.brands} search placeholder='select brands' onChange={this.handleBrands} />
              <Form.Input name='priceFrom' placeholder='PriceFrom' className='vendorforminputfrom' style={style} />
              <Form.Input name='priceTo' placeholder='PriceTo' className='vendorfrominputto' style={style}/>
              <Form.Select name='discount' search options={this.state.discount} placeholder='Discount'/>
              <div className='vendorfilter-product-apply-btn'>
                <Button className="vendorfilter-button-submit" inverted color='red' type='submit'>Apply</Button>
              </div>
            </Form>
          </div>
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={11}>
          <div className='vendorfilter-prod-search-box'>
            <AutoComplete
              hintText="Search Products.."
              hintStyle={styles.errorStyle}
              dataSource={this.state.searchbardata}
              underlineFocusStyle={styles.underlineStyle}
              onNewRequest={this.handlesearchbar}
              className='vendorfilter-prod-search'
            />
          </div>
          <div className='vendorfilter-prod-product-container'>
          {
          this.state.openFilter?
          <VendorProductList productDetails={this.state.formData} openProductList={this.state.openProductList}/>:
          <VendorProductList productDetails={this.state.formData}/>
          }
          </div>
          {this.props.children}
        </Grid.Column>
        <Divider horizontal/>
      </Grid>
    </div>
)
}
}
