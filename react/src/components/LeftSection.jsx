import React from 'react';
import LeftSectionBackground from '../assets/images/left-section-background.jpg';

import { Container, Image } from 'react-bootstrap';

const LeftSection = () => {
  return (
    <Container id="left-section" className="px-5 min-vh-100">
      <h2 className="pt-5">Get your phone feeling new again!</h2>
      <p className="pt-1">With a network of expert technicians at your disposal, experience seamless repairs, right at your doorstep. We value your time and device equally.</p>
      {/* <Image src={LeftSectionBackground} alt="happy-male-entrepreneur-suit-pointing-finger-smartphone-scree-showing-mobile" fluid /> */}
    </Container>
  );
};

export default LeftSection;
