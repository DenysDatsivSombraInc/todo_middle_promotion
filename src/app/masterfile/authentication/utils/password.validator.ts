import { AbstractControl, ValidationErrors } from '@angular/forms';
import {REGISTER_FORM_CONTROLS} from "../constants/register-form.constants";

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get(REGISTER_FORM_CONTROLS.PASSWORD)?.value;
  const confirmPassword = control.get(REGISTER_FORM_CONTROLS.CONFIRM_PASSWORD)?.value;
  return password === confirmPassword ? null : { mismatch: true };
}
