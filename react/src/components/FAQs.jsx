import { Accordion } from "react-bootstrap";

function FAQs() {
  const FAQData = [
    {
      header: "1. How long is a typical phone repair?",
      body: "Most standard repairs, such as screen or battery replacements, are done within 24 hours. However, more complex issues may take longer.",
    },
    {
      header: "2. Do you offer a warranty on your repairs?",
      body: "Yes, we offer a 30-day warranty on all our repairs. If the same issue arises within this period after our repair, we'll fix it for free!",
    },
    {
      header: "3. Can I get an estimate before committing to a repair?",
      body: "Absolutely! You can describe the issue to our technicians or use our online diagnostic tool. We'll provide an estimate based on the described problem. The final pricing might vary slightly after our technicians examine the device in person.",
    },
    {
      header: "4. What if my device is beyond repair?",
      body: "If our technicians determine that your device cannot be repaired, or if it is not cost-effective to do so, we will inform you. We also offer trade-in services where you can exchange your old device for a discount on a new or refurbished one.",
    },
    {
      header: "5. Will my data be safe during repair?",
      body: "Protecting your data is our top priority. Our technicians follow strict guidelines to ensure the privacy and security of your data. However, we always recommend backing up your device before any repair.",
    },
    {
      header: "6. Do you use genuine parts for repairs?",
      body: "Yes, we use OEM (Original Equipment Manufacturer) parts for all our repairs. This ensures your device maintains its top-quality performance and longevity.",
    },
    {
      header: "7. Can I bring my own parts for repair?",
      body: "While we recommend using our trusted parts for quality assurance, we do allow customers to bring their own parts. However, please note that repairs with non-OEM parts won't be eligible for our standard warranty.",
    },
    {
      header: "8. What payment methods do you accept?",
      body: "Currently, we accept payments exclusively through PayPal for enhanced security and convenience.",
    },
  ];

  return (
    <section id="faqs" className="custom-container">
      <h2 className="section-heading text-center text-body">FAQs</h2>
      <Accordion>
        {FAQData.map((item, index) => (
          <Accordion.Item eventKey={index} key={index}>
            <Accordion.Header>{item.header}</Accordion.Header>
            <Accordion.Body>{item.body}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </section>
  );
}

export default FAQs;
