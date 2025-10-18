import ContactSection from "./ContactSection";
import Hero from "./Hero";
import Map from "./Map";
import FAQ from "./FAQ";

const About = () => {
  return (
    <div className="dark:bg-slate-900">
      <Hero />
      <ContactSection />
      <FAQ />
      <Map />
    </div>
  );
};

export default About;
