import { Component, inject, signal } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder,  ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import {  RouterLink } from '@angular/router';

import { ButtonModule} from "primeng/button";
import { DividerModule } from "primeng/divider";
import { FloatLabelModule } from "primeng/floatlabel";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { ToastModule } from "primeng/toast";

import { AuthState } from '../store/reducers/auth.reducer';
import * as AuthActions from '../store/actions/auth.actions';
import { ROUTES } from '../../../shared/constants/routes.constants';
import { LOGIN_VALIDATION } from '../constants/login-validation.constants';
import { LOGIN_FORM_CONTROLS } from "../constants/login-form.constants";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    FloatLabelModule,
    DividerModule,
    ToastModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store<AuthState>);

  loginForm = this.fb.group({
    [LOGIN_FORM_CONTROLS.EMAIL]: LOGIN_VALIDATION.EMAIL,
    [LOGIN_FORM_CONTROLS.PASSWORD]: LOGIN_VALIDATION.PASSWORD,
  });

  isSubmitted = signal(false);

  login() {
    this.isSubmitted.set(true);
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.getRawValue();
    this.store.dispatch(AuthActions.login({ email, password }));
  }

  signUpWithGoogle() {
    this.store.dispatch(AuthActions.googleSignIn());
  }

  protected readonly ROUTES = ROUTES;
  protected readonly LOGIN_FORM_CONTROLS = LOGIN_FORM_CONTROLS;
}
