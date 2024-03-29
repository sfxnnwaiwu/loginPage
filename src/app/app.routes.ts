import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileImageComponent } from './components/profile-image/profile-image.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full'
    },
    {
        path: 'landing',
        title: 'Landing Page',
        component: LandingPageComponent
    },
    {
        path: 'login',
        title: 'Login Page',
        component: LoginComponent
    },
    {
        path: 'users',
        title: 'Users page',
        component: UsersComponent
    },
    {
        path: 'profile',
        title: 'Profile Image',
        component: ProfileImageComponent
    }

];
