import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraveyardComponent } from './graveyard/graveyard.component';
import { HomeComponent } from './home/home.component';
import { SquidGameComponent } from './squid-game/squid-game.component';
import { SquidGameResolver } from './resolver/squid-game.resolver';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'squid-game',
        component: SquidGameComponent,
        resolve: {
          players: SquidGameResolver,
        },
      },
      {
        path: 'graveyard',
        component: GraveyardComponent,
        resolve: {
          players: SquidGameResolver,
        },
      },
      {
        path: 'admin',
        component: AdminComponent,
        resolve: {
          players: SquidGameResolver,
        },
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
