import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import * as AuthActions from "./masterfile/authentication/store/actions/auth.actions";
import {Store} from "@ngrx/store";
import {AuthService} from "./masterfile/authentication/services/auth.service";
import {ToastModule} from "primeng/toast";
import {selectIsAuthenticated, selectUserLoading} from "./masterfile/authentication/store/selectors/auth.selectors";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [CommonModule, RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'todoList';

}
