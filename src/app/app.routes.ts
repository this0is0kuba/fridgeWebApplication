import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path: "", redirectTo: "/home", pathMatch: 'full'},
    {path: "login", component: LoginComponent},
    {path: "registration", component: RegistrationComponent},
    {path: "home", component: HomeComponent}
];
