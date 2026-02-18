import {
  ChiliPepper,
  FloatingNoodle,
  NoodleBowl,
  NoodleSwirl,
  SteamingBowl,
} from "./Ui/NoodleDecorations";
import { DECORATIONS } from "../../user/pages/Moments/constant/decorations.constants";

const COMPONENT_MAP = {
  FloatingNoodle,
  NoodleBowl,
  SteamingBowl,
  ChiliPepper,
  NoodleSwirl,
};

export const Decorations: React.FC = () => {
  return (
    <>
      {DECORATIONS.map((item, index) => {
        const Component = COMPONENT_MAP[item.Component];
        return (
          <Component key={index} className={item.className} {...item.props} />
        );
      })}
    </>
  );
};
