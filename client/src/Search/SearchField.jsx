import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import React, {Component} from "react";
import Button from "react-bootstrap/Button";

class SearchField extends Component{
    constructor(props) {
        super(props);
    }

    handleChange = (e) => {
        this.props.handleChangeValue(e.target.value);
    }

    handleClick = () => {
        console.log('Click!');
        this.props.handleClickOnSearch();
    }

    render() {
        return <div className="center-block">
            <InputGroup>
                <Form.Group controlId="term" className="searchInput">
                    <Form.Label>Term: </Form.Label>
                    <Form.Control type="text"
                                  align="center"
                                  value={this.props.input}
                                  placeholder="Enter a term"
                                  onChange={ this.handleChange }/>
                </Form.Group>
            </InputGroup>
            <Button variant="success"
                    className="searchButton"
                    onClick={ this.handleClick }>Search</Button>
        </div>;
    }
}

export default SearchField;