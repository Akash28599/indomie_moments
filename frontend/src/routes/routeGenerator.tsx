import { Route } from "react-router-dom";
import type { ScreenConfig } from "./route.types";
import type { ReactElement } from "react";

interface Args {
  screens: ScreenConfig[];
  parentIsPublic?: boolean;
}

export const generateRoutes = ({
  screens,
  parentIsPublic = false,
}: Args): ReactElement[] => {
  return screens.map((screen, idx) => {
    const {
      id = String(idx),
      path,
      element,
      children,
      index,
      isPublic,
    } = screen;

    const isRoutePublic = parentIsPublic || isPublic === true;

    const routeElement = (
      <Route key={id} path={path} index={index ? true : undefined} element={element}>
        {children &&
          generateRoutes({
            screens: children,
            parentIsPublic: isRoutePublic,
          })}
      </Route>
    );

    return routeElement;
  });
};
