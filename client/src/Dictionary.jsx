import './App.css';
import React, {Component} from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import SearchField from "./Search/SearchField";
import ResultCard from "./Result/ResultCard";
import Container from "react-bootstrap/Container";
import AddNew from "./Add/AddNew";

class Dictionary extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        existence: undefined,
        input: '',
        term: '',
        definition: ''
    })

    handleClickOnAdd = () => {
        let host = window.location.hostname;
        let description = document.getElementsByClassName("description")[0].value;
        let termDefinition = {
            term: this.state.input,
            definition: description
        };

        fetch(`http://${host}:9000/add`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(termDefinition)
        })
            .then(response => response.json())
            .then((result) => {
                if (result.error) {
                    alert(result.error);
                } else {
                    alert('Term is added successfully');
                    this.setState({
                        existence: true,
                        term: result.term,
                        definition: result.definition
                    })
                }
            })
            .catch(err => alert(err));
    }

    handleClickOnSearch = () => {
        let host = window.location.hostname;
        let termSearch = {term: this.state.input};

        fetch(`http://${host}:9000/search?term=${termSearch.term}`)
            .then(res => res ? res.json() : null)
            .then(
                (result) => {
                    console.log(result);
                    if (result.definition) {
                        console.log(`${termSearch} is found`);
                        this.setState({
                            existence: true,
                            term: result.term,
                            definition: result.definition
                        })
                    } else {
                        console.log(`${termSearch} is not found`);
                        this.setState({
                            existence: false
                        })
                    }
                });
        //await console.log();
    }

    handleChangeValue = (value) => {
        this.setState({ input: value });
    }

    render() {
        let {input, existence, term, definition} = this.state;
        return (
            <Container fluid>
                <Row className="justify-content-md-center row">
                    <Col lg="3">
                        <Form>
                            <SearchField input={input}
                                         handleChangeValue={ this.handleChangeValue }
                                         handleClickOnSearch={ this.handleClickOnSearch }/>
                        </Form>
                    </Col>
                    <Col lg="4">
                        <ResultCard
                            existence={ existence }
                            term={ term }
                            definition={ definition }/>
                    </Col>
                </Row>
                <Row className="justify-content-md-center row">
                    <Col lg={7}>
                        <AddNew
                            handleClickOnAdd={ this.handleClickOnAdd }
                            existence={ existence } />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Dictionary;
