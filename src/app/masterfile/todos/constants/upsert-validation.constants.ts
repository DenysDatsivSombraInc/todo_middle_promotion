import { Validators } from '@angular/forms';

export const UPSERT_VALIDATION = {
  TITLE: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(50) ]],
  DESCRIPTION: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(550)]],
  DUE_DATE: ['', Validators.required]
};
