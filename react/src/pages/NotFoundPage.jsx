/* eslint-disable react/no-unescaped-entities */

import { Container, Row, Col, Button } from 'react-bootstrap';
import error404image from "../assets/images/Error404.svg"

const NotFoundPage = () => {
    return (
        <Container fluid className="error-container">
            <Row className="justify-content-center">
                <Col xs={12} md={6} className="text-center">
                    <img
                        src={error404image}
                        alt="404 error"
                        className="error-image"
                    />
                </Col>
            </Row>
            <Row className="justify-content-center mt-4">
                <Col xs={12} md={6} className="text-center">
                    <h2>Oops!</h2>
                    <p>
                        It looks like your page is broken. Just like a phone, sometimes links don't work.
                    </p>
                    <Button variant="outline-primary w-25" href="/">Go Home</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default NotFoundPage;
