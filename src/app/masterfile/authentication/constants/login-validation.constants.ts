import { Validators } from '@angular/forms';

export const LOGIN_VALIDATION = {
  EMAIL: ['', [Validators.required, Validators.email]],
  PASSWORD: ['', [Validators.required, Validators.minLength(6)]]
};
