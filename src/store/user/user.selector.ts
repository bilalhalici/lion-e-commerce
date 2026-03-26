import { createSelector } from 'reselect';
import { UserState } from './user.reducer';
import { RoutState } from "../store";

export const selectUserReducer = (state: RoutState): UserState => state.user

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (user) => user.currentUser
);
