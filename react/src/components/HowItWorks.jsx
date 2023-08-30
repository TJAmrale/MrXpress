import { Row, Col } from "react-bootstrap";
import CardIndexPage from "./CardIndexPage";

function HowItWorks() {
  const cardData = [
    {
      title: "1",
      subtitle: "Choose Your Device",
      description:
        "Identify your device type and explain what's wrong. Let us know the issues you're facing.",
    },
    {
      title: "2",
      subtitle: "Get an Instant Quote",
      description:
        "No waiting around. Once you detail the problem, we'll provide an immediate price estimate.",
    },
    {
      title: "3",
      subtitle: "Pick Your Time",
      description:
        "Decide on a time that works for you. Our flexible schedule ensures you won't be left waiting.",
    },
    {
      title: "4",
      subtitle: "We Come to You",
      description:
        "Stay where you are. Our expert technician will meet you there and fix your device on the spot.",
    },
  ];

  return (
    <section id="how-it-works">
      <h2 className="section-heading text-center text-body">How It Works</h2>
      <Row xs={1} md={2} lg={4} className="g-4">
        {cardData.map((card) => (
          <Col key={card.title}>
            <CardIndexPage
              title={card.title}
              subtitle={card.subtitle}
              description={card.description}
            />
          </Col>
        ))}
      </Row>
    </section>
  );
}

export default HowItWorks;
