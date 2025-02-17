import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import {  RouterLink } from '@angular/router';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';

import { AuthState } from '../store/reducers/auth.reducer';
import * as AuthActions from '../store/actions/auth.actions';
import { ROUTES } from '../../../shared/constants/routes.constants';
import { REGISTER_VALIDATION } from '../constants/register-validation.constants';
import { passwordMatchValidator } from '../utils/password.validator';
import { REGISTER_FORM_CONTROLS } from '../constants/register-form.constants';

@Component({
  selector: 'app-register',
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
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store<AuthState>);

  registerForm = this.fb.group(
    {
      [REGISTER_FORM_CONTROLS.USERNAME]: REGISTER_VALIDATION.USERNAME,
      [REGISTER_FORM_CONTROLS.EMAIL]: REGISTER_VALIDATION.EMAIL,
      [REGISTER_FORM_CONTROLS.PASSWORD]: REGISTER_VALIDATION.PASSWORD,
      [REGISTER_FORM_CONTROLS.CONFIRM_PASSWORD]: REGISTER_VALIDATION.CONFIRM_PASSWORD,
    },
    { validators: passwordMatchValidator }
  );

  isSubmitted = signal(false);

  register() {
    this.isSubmitted.set(true);
    if (this.registerForm.invalid) return;

    const { username, email, password } = this.registerForm.getRawValue();
    this.store.dispatch(AuthActions.register({ username, email, password }));
  }

  signUpWithGoogle() {
    this.store.dispatch(AuthActions.googleSignIn());
  }

  protected readonly ROUTES = ROUTES;
  protected readonly REGISTER_FORM_CONTROLS = REGISTER_FORM_CONTROLS;
}
