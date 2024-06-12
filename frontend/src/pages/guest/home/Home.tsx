import Hero from "./Hero";
import Stats from "./Stats";
import Newsletter from "./Newsletter";
import WelcomeSection from "./WelcomeSection";

const Home = () => {
  return (
    <div className="dark:bg-slate-900">
      <Hero />
      <Stats />
      <WelcomeSection />
      <Newsletter />
    </div>
  );
};

export default Home;
