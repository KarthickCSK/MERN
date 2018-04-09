import React from 'react';
import {Grid, Divider, Label, Form} from 'semantic-ui-react';
import './questions.css';
import Cookie from 'react-cookie';

export default class Questions extends React.Component {

  constructor(props) {
         super(props);
         this.state = {
             question: '',
             Details: [],
             questiondetail: []
         };
     }

     componentDidMount()
     {
     {this.getProduct()};
     }
     getProduct=()=>{
       $.ajax({
         url: '/userAction/showProduct',
         type: 'POST',
         data:{productID:this.props.productId},
         success: function(response) {
           this.setState({questiondetail:response.questions.reverse()})
         }.bind(this)
       });
     }

     handleinput = (event) => {
       this.setState({question:event.target.value});
     }
     handlesubmit = () => {
      if(this.state.question != '')
      {
       var date= new Date();
       var detail={};
       detail.question=this.state.question;
       detail.id=this.props.productId;
       detail.date=date.toDateString();
       detail.user=Cookie.load('username');
          $.ajax({
            dataType: 'json',
            data: detail,
            type: 'POST',
            url: "/userAction/addquestion"
          });
          this.refs.inputfield.value='';
          {this.getProduct()};
     }
   }

  render() {

    var result = this.state.questiondetail.map((item,index) => {
      if(item.question !== '')
      {
      if(item.answer != ''){
      return (
        <div  className='question_div' key={index}>
          <Grid>
            <Grid.Column width={15} >
              <p><Label color='orange' circular>Q</Label>&nbsp;&nbsp;&nbsp;{item.question}</p>
              <p className='question_date'>By&nbsp;<b>{item.user}</b>&nbsp;&nbsp;&nbsp;on&nbsp;&nbsp;{item.date}</p>
              <p><Label color='grey' circular>A</Label>&nbsp;&nbsp;&nbsp;{item.answer}</p>
            </Grid.Column>
          </Grid>
          <Divider section/>
          <br/>
        </div>
        )
      }else{
        return (
          <div className='question_div' key={index}>
            <Grid>
              <Grid.Column width={15}>
               <pre><Label color='orange' circular>Q</Label>&nbsp;&nbsp;&nbsp;{item.question}</pre>
               <pre className='question_date'>By&nbsp;<b>{item.user}</b>&nbsp;&nbsp;&nbsp;on&nbsp;&nbsp;{item.date}</pre>
               <pre className='question_p-message'><Label color='grey' circular>A</Label>&nbsp;&nbsp;&nbsp;no reply</pre>
              </Grid.Column>
            </Grid>
            <Divider section/>
            <br/>
          </div>
          )
      }
    }
    })
    return (
      <div>
        <Grid>
          <Grid.Column width={1} />
          <Grid.Column width={8}>
              <h2>Customer Questions & Answers</h2>
              <Form>
              <input
                ref='inputfield'
                className='question_input-field'
                placeholder='Have a question?Search for answers'
                onChange={this.handleinput}
              />
              </Form>
              <br/>
              <button id='question_btn-submit' className="bttn-unite bttn-md bttn-warning bttn-block" type='submit' onClick={this.handlesubmit}>Submit</button>
              <br/><br/>
              {result}
          </Grid.Column>
          <Grid.Column width={8} />
        </Grid>
      </div>
    );
  }
}
