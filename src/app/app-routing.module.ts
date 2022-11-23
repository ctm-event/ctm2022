import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraveyardComponent } from './graveyard/graveyard.component';
import { HomeComponent } from './home/home.component';
import { SquidGameComponent } from './squid-game/squid-game.component';
import { PlayersResolver } from './resolver/players.resolver';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      players: PlayersResolver,
    },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'game',
    canActivateChild: [AuthGuard],
    resolve: {
      players: PlayersResolver,
    },
    children: [
      {
        path: 'battle-ground',
        component: SquidGameComponent,
      },
      {
        path: 'graveyard',
        component: GraveyardComponent,
      },
      {
        path: 'setup',
        component: AdminComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
