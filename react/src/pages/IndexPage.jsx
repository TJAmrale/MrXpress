import NavBar from '../components/NavBar';
import NavBarAdmin from '../components/NavBarAdmin';
import NavBarTechnician from '../components/NavBarTechnician';
import NavBarCustomer from '../components/NavBarCustomer';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import WhyWeStandOut from '../components/WhyWeStandOut';
import FAQs from '../components/FAQs';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { useUserContext } from '../contexts/UserProvider';

function IndexPage() {
  const { accessLevel } = useUserContext();

  return (
    <div id="index-page">
      {accessLevel === undefined && <NavBar />}
      {accessLevel === '1' && <NavBarAdmin />}
      {accessLevel === '2' && <NavBarTechnician />}
      {accessLevel === '3' && <NavBarCustomer />}
      
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