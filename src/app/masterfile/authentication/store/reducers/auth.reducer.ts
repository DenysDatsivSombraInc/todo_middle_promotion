import {createReducer, on} from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import {User} from "@angular/fire/auth";

export interface AuthState {
  user: User | null;
  error: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export const initialState: AuthState = {
  user: null,
  error: null,
  isAuthenticated: false,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(
    AuthActions.register,
    AuthActions.login,
    AuthActions.googleSignIn,
    (state) => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    AuthActions.registerSuccess,
    AuthActions.loginSuccess,
    AuthActions.googleSignInSuccess,
    (state, {user}) => ({
      ...state,
      user,
      isAuthenticated: true,
      error: null,
      loading: false,
    })
  ),
  on(
    AuthActions.registerFailure,
    AuthActions.loginFailure,
    AuthActions.googleSignInFailure,
    (state, {error}) => ({
      ...state,
      error,
      loading: false,
    })
  ),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    user: null,
    isAuthenticated: false,
    error: null,
    loading: false,
  }))
);
