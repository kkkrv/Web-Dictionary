import Card from "react-bootstrap/Card";
import React from "react";

function ResultCard(props) {
    if (props.existence === true) {
        return   <Card
            bg="light"
            className="mb-12 card-results results">
            <Card.Body>
                <Card.Header className="resultTitle">{ props.term }</Card.Header>
                <Card.Text className="resultBody">{ props.definition }</Card.Text>
            </Card.Body>
        </Card>;
    } else if (props.existence === false) {
        return   <Card
            bg="light"
            className="mb-12 card-results results">
            <Card.Body>
                <Card.Header className="resultTitle"> Не найдено :( </Card.Header>
                <Card.Text className="resultBody"> Такого определения еще нет. Добавьте его с помощью формы ниже.</Card.Text>
            </Card.Body>
        </Card>;
    } else {
        return  null;
    }

}

export default ResultCard;