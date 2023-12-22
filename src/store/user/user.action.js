import { USER_ACTION_TYPES } from "./user.types";
import { createActions } from "../../utils/reducer/reducer.utils";

export const setCurrentUser = user =>
  createActions(USER_ACTION_TYPES.SET_CURRENT_USER, user);