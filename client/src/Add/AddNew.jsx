import Form from "react-bootstrap/Form";
import React, {Component} from "react";
import Button from "react-bootstrap/Button";

class AddNew extends Component{
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        this.props.handleClickOnAdd();
    }

    render() {
        if (this.props.existence === false) {
            return <Form>
                <Form.Group controlId="TermDefinition">
                    <Form.Label>Definition:</Form.Label>
                    <Form.Control as="textarea" rows={5}
                                  className="description"
                                  placeholder="Type something here" />
                </Form.Group>
                <div className="buttons">
                    <Button variant="success"
                            className="addButton"
                            onClick={ this.handleClick }>Add</Button>
                    <Button variant="light"
                            type="reset"
                            className="resetButton">Reset</Button>
                </div>
            </Form>;
        } else {
            return  null;
        }

    }
}

export default AddNew;