import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { GameComponent } from './game/game.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './Guard/auth.guard';

export const AppRoutingModule: Routes = [
  {
    path: '',
    component: LayoutComponent,
    pathMatch: 'full',
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'game', component: GameComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
];
