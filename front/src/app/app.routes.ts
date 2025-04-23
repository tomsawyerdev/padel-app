import { Routes } from '@angular/router';

import {ReservationsListComponent} from './features/reservations/reservations-list/reservations-list.component';
import {ReservationsSearchComponent} from './features/reservations/reservations-search/reservations-search.component';
import {GamesListComponent} from './features/games/games-list/games-list.component';
import {GamesSearchComponent} from './features/games/games-search/games-search.component';
import {SessionCreateComponent} from './features/session/session-create/session-create.component';
import {LandingPageComponent} from './features/landing/landing-page/landing-page.component';

import { authGuard } from './core/services/auth/auth.guard';



export const routes: Routes = [

    {path: 'reservations/list', component: ReservationsListComponent,canActivate: [authGuard]},        
    {path: 'reservations/search', component: ReservationsSearchComponent,canActivate: [authGuard]},    
    {path: 'games/list', component: GamesListComponent,canActivate: [authGuard]},
    {path: 'games/search', component: GamesSearchComponent,canActivate: [authGuard]},
    {path: 'session', component: SessionCreateComponent},
    {path: '', component: LandingPageComponent},

];

//{path: 'players/create', component: PlayerCreateComponent,canActivate: [authGuard]},