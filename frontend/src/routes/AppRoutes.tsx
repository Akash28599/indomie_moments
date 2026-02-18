import { Routes } from "react-router-dom";

import { SCREEN_LIST } from "./screenList";
import { generateRoutes } from "./routeGenerator";

const AppRoutes = () => {
  return <Routes>{generateRoutes({ screens: SCREEN_LIST })}</Routes>;
};

export default AppRoutes;
