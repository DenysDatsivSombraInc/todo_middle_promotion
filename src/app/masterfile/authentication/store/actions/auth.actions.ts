import {createAction, props} from '@ngrx/store';
import {User} from "@angular/fire/auth";

export const register = createAction('[Auth] Register', props<{ username: string; email: string; password: string }>());

export const registerSuccess = createAction('[Auth] Register Success', props<{ user: User }>());

export const registerFailure = createAction('[Auth] Register Failure', props<{ error: string }>());

export const login = createAction('[Auth] Login', props<{ email: string; password: string }>());

export const loginSuccess = createAction('[Auth] Login Success', props<{ user: User }>());

export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

export const logoutFailure = createAction('[Auth] Logout Failure', props<{ error: string }>());

export const googleSignIn = createAction('[Auth] Google Sign-In');

export const googleSignInSuccess = createAction('[Auth] Google Sign-In Success', props<{ user: User }>());

export const googleSignInFailure = createAction('[Auth] Google Sign-In Failure', props<{ error: string }>());
