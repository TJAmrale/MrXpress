/* eslint-disable react/prop-types */
import { Card } from "react-bootstrap";

function CardIndexPage({title, subtitle, description}) {
  return (
      <Card>
        <Card.Body className="text-center">
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle>{subtitle}</Card.Subtitle>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
  );
}

export default CardIndexPage;
