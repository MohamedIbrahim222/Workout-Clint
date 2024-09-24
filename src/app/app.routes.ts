import { Routes } from '@angular/router';
import { WorkoutListComponent } from './workout-list/WorkoutListComponent';
import { WorkoutStatsComponent } from './workout-stats/workout-statscomponent';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]
    },
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: WorkoutStatsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'workouts',
        component: WorkoutListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];