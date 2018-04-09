import React from 'react';
import { Button, Table, Card, Image, Grid, Dropdown} from 'semantic-ui-react';
export default class Tabular extends React.Component {
	constructor(){
		super()
		this.state={
			discount:''
		}
	}



	handleDiscount=(e,data)=>{
		this.setState({discount:data.value})
	}

	showDetails = () => {
	  var articles = this.props.data;

	     if (articles) {
	    var singleArticle = articles.map((text, index) => {

	    var discountOptions=[{
			text: '10%',
			    value: '10%',
		},
		{
			text: '20%',
			    value: '20%',
		},{
			text: '30%',
			    value: '30%',
		},
		{
			text: '50%',
			    value: '50%',
		}];


	      return(



	      	<Card >
	      	  <Card.Content>

	      	    <Card.Header>
	      	      {text.product}
	      	    </Card.Header>
	      	    <Card.Meta>
	      	      {text.category}/{text.brand}
	      	    </Card.Meta>
	      	    <Card.Description>
	      	      <Dropdown placeholder='Discount'  selection options={discountOptions}  value={this.state.discount} onChange={this.handleDiscount}/>
	      	    </Card.Description>
	      	  </Card.Content>
	      	  <Card.Content extra>
	      	    <div className='ui two buttons'>
	      	      <Button primary  >save</Button>
	      	      <Button secondary  >delete</Button>

	      	    </div>
	      	  </Card.Content>
	      	</Card>


	      	)
	    })
	    return singleArticle;
	  }
	};


	render () {

		const container ={
			marginTop :"2%"
		}

		return (
			<div>

			  <Grid container centered style={container} >
			  <Card.Group doubling itemsPerRow={16}   >

			  {this.showDetails()}
			</Card.Group>



			     </Grid>
			</div>
		);
	}
}
