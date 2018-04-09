import React from 'react'
import {
 Segment,
 Divider,
 Input,
 Grid,
 Icon,
 Button,
 Image,
 Card,
   Popup,
} from 'semantic-ui-react';
import TextField from 'material-ui/TextField';
import './aboutus.css'
import {hashHistory} from 'react-router'
import {grey500} from 'material-ui/styles/colors';
const styles = {
  errorStyle: {
    color: grey500,
    fontFamily: '\'Josefin Sans\', sans-serif',
    fontSize:30,
  },
  underlineStyle: {
    borderColor: grey500,textTransform: 'uppercase',
    color:'white'
  }
  };
export default class About extends React.Component {
 constructor() {
   super();
   this.state = {
     errormail: false,
     firstnameError: false,
     lastnameError: false,
     password: "",
     passwordError: false
   }
 }
 render() {
 let that = this.state.message;
   return (
      <div className="homepage_aboutus">
        <div className="homepage_poster">
        <Grid textAlign='center'>
          <Grid.Column width={16} className="homepage_Logo animated tada">
          </Grid.Column>
          <Grid.Row columns={1}>
            <Grid.Column>
              <h1 className="homepage_moto animated slideInUp">YOUR ULTIMATE SHOP LOCATOR</h1>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row  width={16} only='computer'>
          <h1 className="homepage_steps animated slideInUp">SEARCH WHATEVER YOU WANT</h1>
          </Grid.Row>
          <Grid.Row  width={16} only='computer'>
          <h1 className="homepage_steps animated slideInUp">SELECT SHOP WITH AFFORDABLE PRICE</h1>
          </Grid.Row>
          <Grid.Row  width={16} only='computer'>
          <h1 className="homepage_steps animated slideInUp">LOCATE SHOP ANYWHERE</h1>
          </Grid.Row>

          <Grid.Row >
            <Button inverted style={{'color':'white'}} className='image-btn-text'>
            <Grid.Column textAlign='center'width={1} computer={2} tablet={4} mobile={4}>
              <img className="homepage-anim animated slideInLeft" id="icon" src="./components/aboutUs/includes/shirt.svg"/>
            </Grid.Column>Clothing</Button><Grid.Column width={1} only='computer'/>
            <Button inverted style={{'color':'white'}} className='image-btn-text'>
            <Grid.Column textAlign='center' width={1} computer={2} tablet={4} mobile={4}>
              <img className="homepage-anim animated slideInUp" id="icon" src="./components/aboutUs/includes/smartphone.svg"/>
            </Grid.Column>Mobiles</Button><Grid.Column width={1} only='computer'/>
            <Button inverted style={{'color':'white'}} className='image-btn-text'>
            <Grid.Column textAlign='center' width={1} computer={2}  tablet={4} mobile={4}>
              <img id="icon" className="homepage-anim animated slideInUp" src="./components/aboutUs/includes/high-heels.svg"/>
            </Grid.Column>Footwear</Button><Grid.Column width={1} only='computer'/>
            <Button inverted style={{'color':'white'}} className='image-btn-text'>
            <Grid.Column textAlign='center' width={1} computer={2} tablet={4} mobile={4}>
              <img id="icon" className="homepage-anim animated slideInRight" src="./components/aboutUs/includes/sound-system.svg"/>
            </Grid.Column>Electronics</Button>
          </Grid.Row>

        </Grid>
        </div>
        <div className="homepage_spec">
            <h1 className='homepage_spec-header'>See How It Works</h1>
            <h4 className='homepage_spec-header-text'>Discover how Listable can you help you find everything you want.</h4>
          <br/><br/>
          <Grid container columns='equal'>
            <Grid.Column width={1} computer={1} tablet={1} mobile={1} textAlign='center'/>
            <Grid.Column width={5} computer={5} tablet={5} mobile={16} textAlign='center' >
              <Card id="homepage_div1-card-container" className='aboutus-card-container'>
                      <Grid.Row>
                          <Image id="image" src="./components/aboutUs/includes/png1.PNG" shape="circular"/>
                      </Grid.Row>
                      <Divider className='divider-line'/>
                      <Grid.Row>
                          <h1 className="homepage_detail-head-tag">Register here Yourself</h1>
                      </Grid.Row>
                      <Grid.Row>
                          <h4 className="homepage_detail-sub-head-tag">
                            Are you Looking for discounts? Make use of our application and make your dreams comes true!!!
                          </h4>
                      </Grid.Row>
              </Card>
            </Grid.Column>
            <Grid.Column width={5} computer={5} tablet={5} mobile={16} textAlign='center'>
                <Card id="homepage_extrainfo" className='aboutus-card-container'>
                        <Grid.Row>
                            <Image id="image" src="./components/aboutUs/includes/png2.PNG" shape="circular"/>
                        </Grid.Row>
                        <Divider className='divider-line'/>
                        <Grid.Row>
                            <h1 className="homepage_detail-head-tag">Find What You Want</h1>
                        </Grid.Row>
                        <Grid.Row>
                            <h4 className="homepage_detail-sub-head-tag">Search and filter, read reviews, explore photos and find the perfect spot.</h4><br/>
                        </Grid.Row><br/>
                </Card>
            </Grid.Column>
            <Grid.Column width={5} computer={5} tablet={5} mobile={16} textAlign='center'>
                <Card id="homepage_extrainfo" className='aboutus-card-container'>
                        <Grid.Row>
                            <Image id="homepage_image" src="./components/aboutUs/includes/png3.PNG" shape="circular"/>
                        </Grid.Row>
                        <Divider className='divider-line'/>
                        <Grid.Row>
                            <h1 className="homepage_detail-head-tag">Explore Amazing Places</h1>
                        </Grid.Row>
                        <Grid.Row>
                            <h4 className="homepage_detail-sub-head-tag">Go and have a good time or even make a booking directly from the listing page.</h4><br/>
                        </Grid.Row><br/>
                </Card>
            </Grid.Column>
            </Grid><br/><br/><br/><br/><br/>
            <footer>
                <Grid id="homepage_footer">
                    <Grid.Row>
                        <Grid.Column>
                            <div id="homepage_button">
                             <a href="#"><img id="homepage_icon" src="./components/aboutUs/includes/fb.svg"/></a>
                              <a href="#"><img id="homepage_icon" src="./components/aboutUs/includes/instagram.svg"/></a>
                              <a href="#"><img id="homepage_icon" src="./components/aboutUs/includes/googlePlus.svg"/></a>
                              <a href="#"><img id="homepage_icon" src="./components/aboutUs/includes/pinterest.svg"/></a>
                              <a href="#"><img id="homepage_icon" src="./components/aboutUs/includes/twitter.svg"/></a>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid id="homepage_footer1">
                    <Grid.Row>
                        <Grid.Column>
                          <div id="homepage_footer-text">
                          <br/>
                            <pre>Copyright © 2017 Company Inc. • Address •Tel: 42-898-4363</pre>
                            <pre>Proudly powered by Team Aggregator OWL.</pre>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </footer>
            </div>
        </div>
   );
 }
}
