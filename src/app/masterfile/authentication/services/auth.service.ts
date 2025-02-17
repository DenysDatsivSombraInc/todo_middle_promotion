import { Injectable, inject } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  authState,
  User,
  UserCredential
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

  register(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  googleSignIn(): Observable<UserCredential> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  getCurrentUser(): Observable<User | null> {
    return authState(this.auth);
  }
}
