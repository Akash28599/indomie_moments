import { uuidParamSchema } from "../../../common/schemas";

export const momentIdParamSchema = uuidParamSchema;

export interface ToggleLikeResult {
  likes: number;
  isLiked: boolean;
}
