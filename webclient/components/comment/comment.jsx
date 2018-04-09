import React from 'react';
import {TextArea, Grid, Rating, Label} from 'semantic-ui-react';
import './comment.css';
import Cookie from 'react-cookie';

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: 0,
            value: '',
            average: 0,
            reviewdetail: []
    }
  };
  componentDidMount()
  {
  {this.getProduct()};
  }

  getProduct=()=>{
    var total = 0;
    $.ajax({
      url: '/userAction/showProduct',
      type: 'POST',
      data:{productID:this.props.productId},
      success: function(response) {
        this.setState({reviewdetail:response.reviews})
        if(response.reviews.length == 0)
          {
         this.setState({average:0});
          }
          else{
        var totalvalue = response.reviews.map((item, index) => {
            return (total = parseInt(total) + parseInt(item.rating))
        })
        var avg = total / totalvalue.length;
        this.setState({average: Number((avg).toFixed(1))});
    }
      }.bind(this)
    });
    }

    // State set for comments
    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    //add reviews to database through axios call
    handleCloseSubmit = () => {
      if((this.state.value !== '') && (this.state.rate !== ''))
      {
        var date = new Date();

        let obj = {};
        obj.rate = this.state.rate;
        obj.value = this.state.value;
        obj.id = this.props.productId;
        obj.date = date.toDateString();
        obj.user = Cookie.load('username');
        this.setState({value:'',rate:0})

        $.ajax({
            dataType: 'JSON',
            type: 'POST',
            data: obj,
            url: "/userAction/addreviews",
            success: function(data) {
                console.log(data);
            }.bind(this),
            error: function(err) {
                console.log(err);
            }.bind(this)
        });

        this.props.getdata(this.props.productId);
        {this.getProduct()};
      }
    }

    // State set for rating
    handleRate = (e, {rating}) => this.setState({rate: rating})

    // TODO here the rating and reviews for products should be updated from the database
    render() {
        var result = this.state.reviewdetail.map((details,index) => {
            return (
                <div key={index}>
                    <br/>
                    <Rating maxRating={5}  disabled defaultRating={details.rating} size='massive' icon='star'/>
                    <p>By &nbsp;
                        <b>{details.user}</b>&nbsp; on &nbsp; {details.date}</p>
                    <p>{details.comments}</p>
                    {/* {<a href='#'>comment</a>} */}
                </div>
            )

        });

        return (
            <div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={1}/>
                        <Grid.Column width={15}>
                           <h3><b>Average Rating</b> &nbsp;
                            <Label circular color='orange' className='comment_label'><b>{this.state.average}</b>
                              <Rating maxRating={1} defaultRating={1} disabled icon='star'/>
                            </Label>
                          </h3>
                            <h3>Top Customer Reviews</h3>
                            {result}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={1}/>
                        <Grid.Column width={3}>
                            <h1>Reviews</h1>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={1} computer={1} tablet={1} mobile={1}/>
                        <Grid.Column width={3} computer={3} tablet={3} mobile={15}>
                            <h3>
                                <b>Rate this product</b>
                            </h3>
                            <Rating rating={this.state.rate} maxRating={5} onRate={this.handleRate} size='massive' icon='star'/>
                            <br/>
                        </Grid.Column>
                        <Grid.Column width={1} computer={1} tablet={1} mobile={1}/>
                        <Grid.Column width={6} computer={6} tablet={6} mobile={15}>
                            <h4>Share your thoughts with other customers</h4>
                            <TextArea className='comment_textarea' placeholder='Your comments....' onChange={this.handleChange} value={this.state.value}/><br/>
                            <button id='comments_btn-submit' className="bttn-unite bttn-md bttn-warning bttn-block" type='submit' onClick={this.handleCloseSubmit}>Submit</button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}
