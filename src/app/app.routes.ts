import { Routes } from '@angular/router';
import { ROUTES } from "./shared/constants/routes.constants";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo([ROUTES.LOGIN]);

const redirectToDashboard = () => redirectLoggedInTo([ROUTES.DASHBOARD]);

export const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: ROUTES.DASHBOARD,
      },
      {
        path: ROUTES.DASHBOARD,
        loadComponent: () => import('./masterfile/todos/dashboard/dashboard.component')
          .then(m => m.DashboardComponent),
        ...canActivate(redirectToLogin),
      },
    ]
  },
  {
    path: ROUTES.REGISTER,
    loadComponent: () => import('./masterfile/authentication/register/register.component')
      .then(m => m.RegisterComponent),
    ...canActivate(redirectToDashboard),
  },
  {
    path: ROUTES.LOGIN,
    loadComponent: () => import('./masterfile/authentication/login/login.component')
      .then(m => m.LoginComponent),
    ...canActivate(redirectToDashboard),
  },
  { path: '**', redirectTo: ROUTES.LOGIN }
];
