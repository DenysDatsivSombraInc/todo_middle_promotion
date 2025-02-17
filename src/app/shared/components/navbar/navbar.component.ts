import {Component, inject} from '@angular/core';
import {Button} from "primeng/button";
import {RouterOutlet} from "@angular/router";
import {Store} from "@ngrx/store";
import {AuthState} from "../../../masterfile/authentication/store/reducers/auth.reducer";
import {selectIsAuthenticated} from "../../../masterfile/authentication/store/selectors/auth.selectors";
import * as AuthActions from "../../../masterfile/authentication/store/actions/auth.actions";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    Button,
    RouterOutlet
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private store = inject(Store<AuthState>);
  isAuthenticated = this.store.selectSignal(selectIsAuthenticated);
  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
