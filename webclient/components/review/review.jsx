import React from 'react';
import './review.css';
import {
    Button,
    Modal,
    Form,
    TextArea,
    Image,
    Rating,
    Card
} from 'semantic-ui-react';

export default class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: 0,
            value: '',
            details: [
                {
                    name: "xyz",
                    rating: "3",
                    comment: "super..."
                }, {
                    name: "abc",
                    rating: "4",
                    comment: "nice..."
                }, {
                    name: "xyz",
                    rating: "5",
                    comment: "awesome"
                }
            ],
            ratingdetails: [
                {
                    one: "56",
                    two: "73",
                    three: "37",
                    four: "20",
                    five: "9"
                }
            ]
        };
    }

    handleCloseSubmit = () => {
        this.props.handleOpenReview();
    };

    handleCloseCancel = () => {
        this.props.handleOpenReview();
    };

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    handleRate = (e, {rating, maxRating}) => this.setState({rate: rating})

    render() {

        var result = this.state.details.map(function(details,index) {
            return (
                <Modal.Content image>
                    <Image wrapped size='mini' shape='circular' src='http://semantic-ui.com/images/avatar2/large/rachel.png'/>
                    <Card centered={true} key={index} fluid>
                        <Card.Content>
                            <Modal.Description>
                                <h3>{details.name}</h3>
                                <Rating maxRating={5} defaultRating={details.rating} size='large' icon='star'/>
                                <h4>Comment:{details.comment}</h4>
                            </Modal.Description>
                        </Card.Content>
                    </Card>
                </Modal.Content>
            )
        });
        return (
            <div>
                <Modal size={'small'} open={this.props.open}>
                    {result}
                    <Modal.Content image>
                        <Image wrapped size='mini' shape='circular' src='http://semantic-ui.com/images/avatar2/large/rachel.png'/>
                        <Card centered={true} fluid>
                            <Card.Content>
                                <Modal.Description>
                                    <h3>Yourself</h3>
                                    <h4 id="h4">Ratings</h4>
                                    <Rating maxRating={5} onRate={this.handleRate} size='large' icon='heart'/>
                                    <br/>
                                    <Form>
                                        <TextArea placeholder='Your comments....' onChange={this.handleChange}/>
                                    </Form>
                                </Modal.Description>
                            </Card.Content>
                        </Card>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.handleCloseCancel}>Cancel</Button>
                        <Button positive onClick={this.handleCloseSubmit}>Submit</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}
