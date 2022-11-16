import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraveyardComponent } from './graveyard/graveyard.component';
import { HomeComponent } from './home/home.component';
import { SquidGameComponent } from './squid-game/squid-game.component';
import { SquidGameResolver } from './resolver/squid-game.resolver';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
