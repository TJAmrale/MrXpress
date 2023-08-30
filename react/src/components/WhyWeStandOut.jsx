import { Col, Row } from "react-bootstrap";
import CardIndexPage from "./CardIndexPage";

function WhyWeStandOut() {
  const cardData = [
    {
      title: "1",
      subtitle: "Quick Repairs",
      description:
        "Get your device back in action in no time.",
    },
    {
      title: "2",
      subtitle: "Trusted Technicians",
      description:
        "Connect with skilled and vetted technicians near you.",
    },
    {
      title: "3",
      subtitle: "Transparent Pricing",
      description:
        "Know the price upfront once you've described the problem. No hidden costs.",
    },
    {
      title: "4",
      subtitle: "Utmost Convenience",
      description:
        "Repairs done at your chosen location – home, workplace, or any spot you prefer.",
    },
  ];

  return (
    <section id="why-we-stand-out" className="custom-container">
      <h2 className="section-heading text-center">Why We Stand Out</h2>
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

export default WhyWeStandOut;
