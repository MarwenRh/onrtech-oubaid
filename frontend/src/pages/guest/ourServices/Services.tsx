import Hero from "./Hero";

import ServicesList from "./ServicesList";
import ClientsList from "./ClientsList";

import QuestionsList from "./QuestionList";

const Srevices = () => {
  return (
    <div className="dark:bg-slate-900">
      <Hero />
      <ServicesList />
      <ClientsList />
      <QuestionsList />
    </div>
  );
};

export default Srevices;
