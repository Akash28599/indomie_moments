import Hero from "./Hero";
import HowWorks from "./HowWorks";
import ChampionsList from "./ChampionsList";
import Prize from "./Prize";
import MomentsList from "./MomentsList";
import CTA from "../../../common/components/CTA";
import { REGISTER_CTA } from "../../../common/constants/cta.constant";
import { useAuth } from "../../../../hooks/useAuth";



const Home = () => {
  const {isAuthenticated} = useAuth();

  return (
    <div>
      <Hero />
      <HowWorks />
      <Prize />
      <ChampionsList />
      <MomentsList />
      <CTA config={REGISTER_CTA} isAuthenticated={isAuthenticated} />
    </div>
  );
};

export default Home;
