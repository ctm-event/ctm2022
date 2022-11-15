import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { SquidGameComponent } from './squid-game/squid-game.component';
import { PlayerComponent } from './squid-game/player/player.component';
import { DynamiteComponent } from './squid-game/player/dynamite/dynamite.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, MenuComponent, SquidGameComponent, PlayerComponent, DynamiteComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
