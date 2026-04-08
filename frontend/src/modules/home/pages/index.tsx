import HeroSection from '../components/HeroSection';
import ProfileSelection from '../components/ProfileSelection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import StatsSection from '../components/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CompaniesSection from '../components/CompaniesSection';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import { useAppContext } from '../../../shared/context';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const HomePage = () => {
  const { auth } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate('/candidate/dashboard');
    }
  }, [auth, navigate]);

  // Don't render home page if user is logged in
  if (auth) {
    return null;
  }

  return (
    <div className="w-full">
      <HeroSection />
      <ProfileSelection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <TestimonialsSection />
      <CompaniesSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default HomePage;
