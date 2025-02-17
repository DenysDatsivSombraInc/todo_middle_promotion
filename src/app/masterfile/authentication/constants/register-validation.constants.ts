import { Validators} from '@angular/forms';

export const REGISTER_VALIDATION = {
  USERNAME: ['', [Validators.required]],
  EMAIL: ['', [Validators.required, Validators.email]],
  PASSWORD: ['', [Validators.required, Validators.minLength(6)]],
  CONFIRM_PASSWORD: ['', [Validators.required]]
};

