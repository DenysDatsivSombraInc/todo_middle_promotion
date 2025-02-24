import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { routes } from './app.routes';
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { authReducer } from "./masterfile/authentication/store/reducers/auth.reducer";
import { AuthEffects } from "./masterfile/authentication/store/effects/auth.effects";
import { importProvidersFrom } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import {todoReducer} from "./masterfile/todos/store/reducers/todo.reducer";
import {TodoEffects} from "./masterfile/todos/store/effects/todo.effect";
import {environment} from "../environments/environment";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    provideHttpClient(),

    provideAnimations(),

    importProvidersFrom(
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule
    ),

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
    provideFunctions(() => getFunctions()),

    provideStore({ auth: authReducer ,todos:todoReducer}),
    provideEffects([AuthEffects,TodoEffects]),
    provideFirestore(() => getFirestore()),
    MessageService,
  ],
};
