import React from 'react';
import { Card, Icon, Image,Grid , Dropdown ,Button, Table, Header, Rating} from 'semantic-ui-react';
import Tabular from './tabular';
export default class ProductRegister extends React.Component {
	constructor(){
	super();
	this.state={
		category:'',
		product:'',

		brand:'',
		data:[]
	}

	}

	handleCategory=(e,data)=>{
		this.setState({category:data.value})
	}
	handleProduct=(e,data)=>{
		this.setState({product:data.value})
	}

	handleBrand=(e,data)=>{
		this.setState({brand:data.value})
	}



	add=()=>{
		let obj={}
		obj.category=this.state.category;
		obj.brand=this.state.brand;
		obj.product=this.state.product;

		this.setState(()=>{this.state.data.push(obj)})

	}


	render () {
		const containerTop={
			marginRight : "5%",
			marginBottom : "5%",

		}
		const container ={
			marginTop :"5%",
				backgroundColor:'#bdbdbd'
		}




		var categoryOptions=[{
			text: 'Electronics',
			    value: 'Electronics',
		},
		{
			text: 'Clothing',
			    value: 'Clothing',
		}];
		var productOptions=[{
			text: 'Led TV',
			    value: 'Led TV',
		},
		{
			text: 'Shoes',
			    value: 'Shoes',
		}];
		var brandOptions=[{
			text: 'Sony',
			    value: 'Sony',
		},
		{
			text: 'Nike',
			    value: 'Nike',
		}];
		return (
			<div>
				<Grid container  centered style={container} >

    <Grid.Row columns={1}>
      <Grid.Column mobile ={16}  computer={16}>
        <Card   fluid>
            <Card.Content>
              <Card.Description>
               	<Grid.Row columns={2} >
               	  <Grid.Column mobile ={16}  computer={8} >
               	  	<Dropdown placeholder='Category'  selection options={categoryOptions} style={containerTop}  onChange={this.handleCategory}/>
               	  	<Dropdown placeholder='Product'  selection options={productOptions} style={containerTop}  onChange={this.handleProduct}/>
               	  </Grid.Column>

               	</Grid.Row>
               	<Grid.Row columns={2} >
               	  <Grid.Column mobile ={16}  computer={8} >
               	  	<Dropdown placeholder='Brand'  selection options={brandOptions} style={containerTop} value={this.state.brand}  onChange={this.handleBrand}/>
										<Button primary  onClick={this.add}>Add</Button>
               	  </Grid.Column>
               	</Grid.Row>
								<div
									style={{fontWeight: 'bold'}}
								>
									<a href='/'>Click here</a>
									<span> to go home</span>
								</div>
              </Card.Description>
            </Card.Content>
          </Card>
      </Grid.Column>

    </Grid.Row>
  </Grid>

  		<Tabular data={this.state.data}/>
			</div>
		);
	}
}
