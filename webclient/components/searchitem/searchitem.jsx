import React from 'react';
import {hashHistory} from 'react-router';
import AllPlaces from '../maplocation';

import { Dropdown, Button, Divider, Image, Grid,Menu,Input} from 'semantic-ui-react';
import './search.css';
export default class SearchProduct extends React.Component {
	constructor() {
		super();
		this.state = {
			categoryvalue: '',
			productvalue: '',
			brandvalue: '',
			shoppingCart: {},
			location: {},
		};
	}



	handleSearch = ({lat, lng}) => {
	this.setState({
		shoppingCart: {
			Category: this.state.categoryvalue,
			Product: this.state.productvalue,
			Brand: this.state.brandvalue,
			location: {lat, lng}
		}
	});
	const path = '/vendors';
	hashHistory.push(path);
	}
	render () {
		const style = {
			search: {
				marginLeft: '10%'
			}
		};
		return (
			<div >
				<Grid centred className='product-grid'>
					 	<Grid.Column width={16} >
					 	<Menu verticle>
					 	<Dropdown text='Electronics' pointing className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown text='Mobile' pointing='left' className='link item'>
						 	<Dropdown.Menu>
						 	<Dropdown.Item onClick={this.props.showMarker}>Mobiles</Dropdown.Item>
						 	<Dropdown.Item onClick={this.props.showMarker}>Mobile cases</Dropdown.Item>
						 	<Dropdown.Item onClick={this.props.showMarker}>Memory cards</Dropdown.Item>
						 	<Dropdown.Item onClick={this.props.showMarker}>Screen Gaurds</Dropdown.Item>
						 	<Dropdown.Item onClick={this.props.showMarker}>Selfie stick</Dropdown.Item>
						 	<Dropdown.Item onClick={this.props.showMarker}>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Computers' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>Monitors</Dropdown.Item>
						 	<Dropdown.Item>Cpu</Dropdown.Item>
						 	<Dropdown.Item>Cables</Dropdown.Item>
						 	<Dropdown.Item>Mouse</Dropdown.Item>
						 	<Dropdown.Item>Keyboard</Dropdown.Item>
						 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Laptops' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>Hard Disk</Dropdown.Item>
						 	<Dropdown.Item>Pendrive</Dropdown.Item>
						 	<Dropdown.Item>Laptop Bags</Dropdown.Item>
						 	<Dropdown.Item>peripherals</Dropdown.Item>
						 	<Dropdown.Item>Network components</Dropdown.Item>
						 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Camera' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>Chip</Dropdown.Item>
						 	<Dropdown.Item>Cables</Dropdown.Item>
						 	<Dropdown.Item>Data cards</Dropdown.Item>
						 	<Dropdown.Item>peripherals</Dropdown.Item>
						 	<Dropdown.Item>Connectors</Dropdown.Item>
						 	<Dropdown.Item>Others</Dropdown.Item>
						 	</Dropdown.Menu>
						 	</Dropdown>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text=' Appliances ' pointing className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown text='Tv' pointing='left' className='link item'>
						 	<Dropdown.Menu>
						 	<Dropdown.Item>Sony</Dropdown.Item>
						 	<Dropdown.Item>Samsung</Dropdown.Item>
						 	<Dropdown.Item>LG</Dropdown.Item>
						 	<Dropdown.Item>VU</Dropdown.Item>
						 	<Dropdown.Item>BPL</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Whasing Maching' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>Sony</Dropdown.Item>
						 	<Dropdown.Item>Samsung</Dropdown.Item>
						 	<Dropdown.Item>LG</Dropdown.Item>
						 	<Dropdown.Item>VU</Dropdown.Item>
						 	<Dropdown.Item>BPL</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Refridgerator' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>Philips</Dropdown.Item>
						 	<Dropdown.Item>LG</Dropdown.Item>
						 	<Dropdown.Item>Samsung</Dropdown.Item>
						 	<Dropdown.Item>BPL</Dropdown.Item>
						 	<Dropdown.Item>VU</Dropdown.Item>
						 	<Dropdown.Item>LG</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Hair conditioner' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>Philips</Dropdown.Item>
						 	<Dropdown.Item>LG</Dropdown.Item>
						 	<Dropdown.Item>Samsung</Dropdown.Item>
						 	<Dropdown.Item>BPL</Dropdown.Item>
						 	<Dropdown.Item>VU</Dropdown.Item>
						 	<Dropdown.Item>LG</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Kitchen Storages' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>Induction</Dropdown.Item>
						 	<Dropdown.Item>Microwave Oven</Dropdown.Item>
						 	<Dropdown.Item>Water purifiers</Dropdown.Item>
						 	<Dropdown.Item>Water Heaters</Dropdown.Item>
						 	<Dropdown.Item>Sandwich makers</Dropdown.Item>
						 	<Dropdown.Item>Vacuum Cleaners</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Men' pointing className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown text='Clothing' pointing='left' className='link item'>
						 	<Dropdown.Menu>
						 	<Dropdown.Item>T-shirts</Dropdown.Item>
						 	<Dropdown.Item>Shirts</Dropdown.Item>
						 	<Dropdown.Item>Jeans</Dropdown.Item>
						 	<Dropdown.Item>Trousers</Dropdown.Item>
						 	<Dropdown.Item>Sports Wears</Dropdown.Item>
						 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Footwear' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>Formals</Dropdown.Item>
						 	<Dropdown.Item>Casuls</Dropdown.Item>
						 	<Dropdown.Item>Flip-Flops</Dropdown.Item>
						 	<Dropdown.Item>Sandals&Floaters</Dropdown.Item>
						 	<Dropdown.Item>Sports</Dropdown.Item>
						 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Watches' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>Fast Track</Dropdown.Item>
						 	<Dropdown.Item>Casio</Dropdown.Item>
						 	<Dropdown.Item>Titan</Dropdown.Item>
						 	<Dropdown.Item>Sonata</Dropdown.Item>
						 	<Dropdown.Item>Fossil</Dropdown.Item>
						 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Accessories' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>Belt</Dropdown.Item>
						 	<Dropdown.Item>Wallet</Dropdown.Item>
						 	<Dropdown.Item>Perfumes</Dropdown.Item>
						 	<Dropdown.Item>Trimmers</Dropdown.Item>
						 	<Dropdown.Item>Luggage&Travels</Dropdown.Item>
						 	<Dropdown.Item>Hair Grooming</Dropdown.Item>
						 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Women' pointing className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown text='Ethnic wear' pointing='left' className='link item'>
						 	<Dropdown.Menu>
						 	<Dropdown.Item>Sarees</Dropdown.Item>
						 	<Dropdown.Item>kurtas</Dropdown.Item>
						 	<Dropdown.Item>Dress Material</Dropdown.Item>
						 	<Dropdown.Item>Salwar suits</Dropdown.Item>
						 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Western wear' pointing='left' className='link item'>
					 	<Dropdown.Menu>
					 	<Dropdown.Item>Tops</Dropdown.Item>
					 	<Dropdown.Item>Shirts</Dropdown.Item>
					 	<Dropdown.Item>Skirts</Dropdown.Item>
					 	<Dropdown.Item>Tunics</Dropdown.Item>
					 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Watches' pointing='left' className='link item'>
					 	<Dropdown.Menu>
					 	<Dropdown.Item>Fast Track</Dropdown.Item>
					 	<Dropdown.Item>Casio</Dropdown.Item>
					 	<Dropdown.Item>Titan</Dropdown.Item>
					 	<Dropdown.Item>Sonata</Dropdown.Item>
					 	<Dropdown.Item>Fossil</Dropdown.Item>
					 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Footwear' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>Formals</Dropdown.Item>
						 	<Dropdown.Item>Casuals</Dropdown.Item>
						 	<Dropdown.Item>Heals</Dropdown.Item>
						 	<Dropdown.Item>Flats</Dropdown.Item>
						 	<Dropdown.Item>Boots</Dropdown.Item>
						 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Jewellary and Accessories' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>Precious Jewellary</Dropdown.Item>
						 	<Dropdown.Item>Silver Jewellary</Dropdown.Item>
						 	<Dropdown.Item>Artificial Jewellary</Dropdown.Item>
						 	<Dropdown.Item>Digitally crafted Jewellary</Dropdown.Item>
						 	<Dropdown.Item>Gold coins</Dropdown.Item>
						 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Baby & Kids' pointing className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown text='Clothing' pointing='left' className='link item'>
						 	<Dropdown.Menu>
						 	<Dropdown.Item>Ethnic wear</Dropdown.Item>
						 	<Dropdown.Item>Summer wear</Dropdown.Item>
						 	<Dropdown.Item>Winter wear</Dropdown.Item>
						 	<Dropdown.Item>Body suits</Dropdown.Item>
						 	<Dropdown.Item>Casuals</Dropdown.Item>
						 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Footwear' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>Formals</Dropdown.Item>
						 	<Dropdown.Item>Casuals</Dropdown.Item>
						 	<Dropdown.Item>Heals</Dropdown.Item>
						 	<Dropdown.Item>Flats</Dropdown.Item>
						 	<Dropdown.Item>Boots</Dropdown.Item>
						 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Toys' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>Educational toys</Dropdown.Item>
						 	<Dropdown.Item>REmote controlled toys</Dropdown.Item>
						 	<Dropdown.Item>Soft toys</Dropdown.Item>
						 	<Dropdown.Item>Outdoor toys</Dropdown.Item>
						 	<Dropdown.Item>Puzzles</Dropdown.Item>
						 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Baby care' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>Diapers</Dropdown.Item>
						 	<Dropdown.Item>Skin cares</Dropdown.Item>
						 	<Dropdown.Item>Baby gifting sets</Dropdown.Item>
						 	<Dropdown.Item>Baby Grooming</Dropdown.Item>
						 	<Dropdown.Item>Furniture</Dropdown.Item>
						 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Featured band' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>Disney</Dropdown.Item>
						 	<Dropdown.Item>Crocs</Dropdown.Item>
						 	<Dropdown.Item>Puma</Dropdown.Item>
						 	<Dropdown.Item>Lego</Dropdown.Item>
						 	<Dropdown.Item>LuvLap</Dropdown.Item>
						 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Home & Furniture' pointing className='link item'>
					 	<Dropdown.Menu>
					 	<Dropdown text='Kitchen & Dining' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>Pots&PAns</Dropdown.Item>
						 	<Dropdown.Item>Pressure Cookers</Dropdown.Item>
						 	<Dropdown.Item>Kitchen tools</Dropdown.Item>
						 	<Dropdown.Item>Gas Stoves</Dropdown.Item>
						 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Kitchen Storage' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>Lunch Boxes</Dropdown.Item>
						 	<Dropdown.Item>Flasks&Casseroles</Dropdown.Item>
						 	<Dropdown.Item>Containers&Bottles</Dropdown.Item>
						 	<Dropdown.Item>Dining&Serving</Dropdown.Item>
						 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Furniture' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>Beds</Dropdown.Item>
						 	<Dropdown.Item>Sofas</Dropdown.Item>
						 	<Dropdown.Item>Dining Table</Dropdown.Item>
						 	<Dropdown.Item>Tv Cabinets</Dropdown.Item>
						 	<Dropdown.Item>Mattresses</Dropdown.Item>
						 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Tools&Hardware' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>Hardware&Electricals</Dropdown.Item>
						 	<Dropdown.Item>Hand Tools</Dropdown.Item>
						 	<Dropdown.Item>Power Tools</Dropdown.Item>
						 	<Dropdown.Item>Gardening Tools</Dropdown.Item>
						 	<Dropdown.Item>Ladders&Dining Tools</Dropdown.Item>
						 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Home Decor' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>Paintig</Dropdown.Item>
						 	<Dropdown.Item>Clocks</Dropdown.Item>
						 	<Dropdown.Item>Walls Decor</Dropdown.Item>
						 	<Dropdown.Item>Showpieces</Dropdown.Item>
						 	<Dropdown.Item>Lightning</Dropdown.Item>
						 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Books & More' pointing className='link item'>
					 	<Dropdown.Menu>
					 	<Dropdown text='Stationary' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>Pens</Dropdown.Item>
						 	<Dropdown.Item>Diaries</Dropdown.Item>
						 	<Dropdown.Item>NOte books</Dropdown.Item>
						 	<Dropdown.Item>Desk Organises</Dropdown.Item>
						 	<Dropdown.Item>Calculators</Dropdown.Item>
						 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Music' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>CDs</Dropdown.Item>
						 	<Dropdown.Item>Disk</Dropdown.Item>
						 	<Dropdown.Item>Studies</Dropdown.Item>
						 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Fitness Accessories' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>Gloves</Dropdown.Item>
						 	<Dropdown.Item>AB Exerciers</Dropdown.Item>
						 	<Dropdown.Item>Yoga Mats</Dropdown.Item>
						 	<Dropdown.Item>Dummbels</Dropdown.Item>
						 	<Dropdown.Item>Cardio Equipment</Dropdown.Item>
						 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Gaming' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>Ps3</Dropdown.Item>
						 	<Dropdown.Item>Ps4</Dropdown.Item>
						 	<Dropdown.Item>Gaming Consoles</Dropdown.Item>
						 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>

					 	<Dropdown text='Musical Instruments' pointing='left' className='link item'>
					 	<Dropdown.Menu>
						 	<Dropdown.Item>Guitar</Dropdown.Item>
						 	<Dropdown.Item>Keyboard</Dropdown.Item>
						 	<Dropdown.Item>Drums</Dropdown.Item>
						 	<Dropdown.Item>Music Accessories</Dropdown.Item>
						 	<Dropdown.Item>Others</Dropdown.Item>
					 	</Dropdown.Menu>
					 	</Dropdown>
					 	</Dropdown.Menu>
					 	</Dropdown>
						</Menu>
			</Grid.Column>
		</Grid>
	</div>
			);
	}
}
