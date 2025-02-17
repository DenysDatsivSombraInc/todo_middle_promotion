import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';
import {STORE_KEYS} from "../../../../shared/constants/store.constasts";

export const selectAuthState = createFeatureSelector<AuthState>(STORE_KEYS.AUTH);

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectUserLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);
