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
import './aboutus.css';
import {orange500} from 'material-ui/styles/colors';
const styles = {
  errorStyle: {
    color: orange500,
    fontFamily: '\'Josefin Sans\', sans-serif',
    fontSize:30,

  },
  underlineStyle: {
    borderColor: orange500,textTransform: 'uppercase',
    color:'white'
  }
  };
export default class Footer extends React.Component {
 constructor() {
   super();
 }

 render() {
   return (

     <div className="homepage_gap">
       <div className="home_poster">
           <footer>
               <Grid id="homepage_footer">
                   <Grid.Row>
                       <Grid.Column>
                           <div id="homepage_button">
                             <img id="homepage_icon" src="./components/aboutUs/includes/fb.svg"/>
                             <img id="homepage_icon" src="./components/aboutUs/includes/instagram.svg"/>
                             <img id="homepage_icon" src="./components/aboutUs/includes/googlePlus.svg"/>
                             <img id="homepage_icon" src="./components/aboutUs/includes/pinterest.svg"/>
                             <img id="homepage_icon" src="./components/aboutUs/includes/twitter.svg"/>
                           </div>
                       </Grid.Column>
                   </Grid.Row>
               </Grid>
               <Grid id="homepage_footer1">
                   <Grid.Row>
                       <Grid.Column>
                         <div id='homepage_footer-text'>
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
