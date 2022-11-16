import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Player } from '../interface/player.interface';
import { SquidGameService } from '../squid-game/squid-game.service';
import { StoreService } from '../store.service';

@Injectable()
export class SquidGameResolver implements Resolve<Player[]> {
  constructor(
    private storeService: StoreService,
    private squidGameService: SquidGameService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Player[]> {
    if (this.storeService.loaded) {
      return this.squidGameService.allPlayers;
    }

    return this.storeService.loadPlayers();
  }
}
