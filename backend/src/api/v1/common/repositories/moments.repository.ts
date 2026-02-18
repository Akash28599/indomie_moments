/**
 * Shared moments data access. Both admin and user modules use this layer
 * so moment reads/writes have a single ownership boundary.
 */
export {
  getMomentByIdRepo,
  getMomentBySlugRepo,
  listApprovedMomentsRepo,
  type MomentListItem,
} from "../../modules/user/moments/moments.repository";
