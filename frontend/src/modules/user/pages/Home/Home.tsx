import { useAppSelector, selectIsAuthenticated } from "../../../../store";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";

/**
 * Home – Smart router component.
 * Guest users → LandingPage (single-viewport, high-conversion)
 * Authenticated users → Dashboard (moments gallery + engagement hub)
 */
const Home = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return isAuthenticated ? <Dashboard /> : <LandingPage />;
};

export default Home;
