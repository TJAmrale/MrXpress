/* eslint-disable react/no-unescaped-entities */

import { Carousel } from "react-bootstrap";

function Testimonials() {
  return (
    <section id="testimonials">
      <h2 className="section-heading text-center">What Our Clients Say</h2>
      <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <div className="img-box"><img src="https://i.ibb.co/d5DY64w/img1.jpg" alt=""/></div>
        <div className="text-box text-center">
          <h5>Emily Johnson</h5>
          <p>"I had doubts initially, but this service won me over. The team is professional, and my device now works like new!"</p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="img-box"><img src="https://i.ibb.co/5FF1vqz/img2.jpg" alt=""/></div>
        <div className="text-box text-center">
          <h5>John Doe</h5>
          <p>I had a great experience using this service. My phone was repaired so quickly, and the technicians were extremely helpful!"</p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="img-box"><img src="https://i.ibb.co/Trv7hDv/img3.jpg" alt=""/></div>
        <div className="text-box text-center">
          <h5>Sarah Miller</h5>
          <p>"My phone's screen was repaired within hours. The process was so simple, and the technicians were very friendly."</p>
        </div>
      </Carousel.Item>
    </Carousel>
    </section>
  );
}

export default Testimonials;
