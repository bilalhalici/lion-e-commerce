import { USER_ACTION_TYPES } from "./user.types";
import { createActions } from "../../utils/reducer/reducer.utils";

export const setCurrentUser = (user) =>
  createActions(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const checkUserSession = () =>
  createActions(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () =>
  createActions(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) =>
  createActions(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });

export const signInSuccess = user =>
  createActions(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const signInFailed = error =>
  createActions(USER_ACTION_TYPES.SIGN_IN_FAILED, error);

export const signUpStart = (email, password, displayName) =>
  createActions(USER_ACTION_TYPES.SIGN_UP_START, {
    email,
    password,
    displayName,
  });

export const signUpSuccess = ({ user, additionalDetails }) =>
  createActions(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails });

export const signUpFailed = error =>
  createActions(USER_ACTION_TYPES.SIGN_UP_FAILED, error);

export const signOutStart = () =>
  createActions(USER_ACTION_TYPES.SIGN_OUT_START);

export const signOutSuccess = () =>
  createActions(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);

export const signOutFailed = error =>
  createActions(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);
