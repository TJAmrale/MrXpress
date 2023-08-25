import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import WhyWeStandOut from '../components/WhyWeStandOut';
import FAQs from '../components/FAQs';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';

function IndexPage() {
  return (
    <div id="index-page">
      <NavBar />
      <HeroSection />
      <HowItWorks />
      <WhyWeStandOut />
      <Testimonials />
      <FAQs />
      <Footer />
    </div>
  )
}

export default IndexPage;