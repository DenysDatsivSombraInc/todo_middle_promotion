import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import * as AuthActions from '../actions/auth.actions';
import {AuthService} from '../../services/auth.service';
import {ROUTES} from '../../../../shared/constants/routes.constants';
import {MessagesService} from '../../../../shared/services/top-left-message.service';
import {MESSAGES} from '../../../../shared/constants/messages.constants';
import {MESSAGE_SUMMARY} from '../../../../shared/constants/message-summary.constants';
import {MESSAGE_SEVERITY} from '../../../../shared/constants/message-severity.constants';
import {FIREBASE_ERRORS} from '../../../../shared/constants/firebase-errors.constants';
import {User} from "@angular/fire/auth";

@Injectable()
export class AuthEffects {

  loadUser$ = createEffect(() =>
    this.authService.getCurrentUser().pipe(
      map((user) =>

        user ? AuthActions.loginSuccess({user: this.extractUser(user)}) : AuthActions.logoutSuccess()
      ),
      catchError(() => of(AuthActions.logoutSuccess()))
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({email, password}) =>
        this.authService.register(email, password).pipe(
          tap(() => {
            this.messagesService.showTopLeft(
              MESSAGE_SEVERITY.SUCCESS,
              MESSAGE_SUMMARY.REGISTRATION,
              MESSAGES.REGISTRATION_SUCCESS
            );
            this.router.navigate([ROUTES.LOGIN]);
          }),
          map((userCredential) =>
            AuthActions.registerSuccess({user: this.extractUser(userCredential.user)})
          ),
          catchError((error) => {
            this.handleError(error, MESSAGE_SUMMARY.REGISTRATION);
            return of(AuthActions.registerFailure({error: error.message}));
          })
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({email, password}) =>
        this.authService.login(email, password).pipe(
          tap(() => this.router.navigate([ROUTES.DASHBOARD])),
          map((userCredential) =>
            AuthActions.loginSuccess({user: this.extractUser(userCredential.user)})
          ),
          catchError((error) => {
            this.handleError(error, MESSAGE_SUMMARY.REGISTRATION);
            return of(AuthActions.loginFailure({error}));
          })
        )
      )
    )
  );

  googleSignIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.googleSignIn),
      mergeMap(() =>
        this.authService.googleSignIn().pipe(
          tap(() => this.router.navigate([ROUTES.DASHBOARD])),
          map((userCredential) =>
            AuthActions.googleSignInSuccess({user: this.extractUser(userCredential.user)})
          ),
          catchError((error) => {
            this.handleError(error, MESSAGE_SUMMARY.REGISTRATION);
            return of(AuthActions.googleSignInFailure({error}));
          })
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      mergeMap(() =>
        this.authService.logout().pipe(
          map(() => {
            this.router.navigate(['/', ROUTES.LOGIN])
            return AuthActions.logoutSuccess()
          }),
          catchError((error) => of(AuthActions.logoutFailure({error})))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private messagesService: MessagesService
  ) {
  }

  private extractUser(user: User): User {
    return JSON.parse(JSON.stringify(user));
  }


  private handleError(error: any, summary: string): void {
    this.messagesService.showTopLeft(
      MESSAGE_SEVERITY.ERROR,
      summary,
      FIREBASE_ERRORS[error.code] || MESSAGES.DEFAULT
    );
  }
}
