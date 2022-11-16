import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraveyardComponent } from './graveyard/graveyard.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { DynamiteComponent } from './player/dynamite/dynamite.component';
import { PlayerComponent } from './player/player.component';
import { SquidGameResolver } from './resolver/squid-game.resolver';
import { SquidGameComponent } from './squid-game/squid-game.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SquidGameComponent,
    PlayerComponent,
    DynamiteComponent,
    HomeComponent,
    GraveyardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [SquidGameResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
