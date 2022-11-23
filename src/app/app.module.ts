import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraveComponent } from './grave/grave.component';
import { GraveyardComponent } from './graveyard/graveyard.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { DynamiteComponent } from './player/dynamite/dynamite.component';
import { PlayerComponent } from './player/player.component';
import { PlayersResolver } from './resolver/players.resolver';
import { SquidGameComponent } from './squid-game/squid-game.component';
import { AdminComponent } from './admin/admin.component';
import { PlayerFormComponent } from './admin/player-form/player-form.component';
import { LoginComponent } from './auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SquidGameComponent,
    PlayerComponent,
    DynamiteComponent,
    HomeComponent,
    GraveyardComponent,
    GraveComponent,
    AdminComponent,
    PlayerFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [PlayersResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
