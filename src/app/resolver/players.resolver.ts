import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { Player } from '../interface/player.interface';
import { StoreService } from '../store.service';

@Injectable()
export class PlayersResolver implements Resolve<Player[]> {
  constructor(
    private storeService: StoreService,
    private appService: AppService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Player[]> {
    if (this.storeService.loaded) {
      return this.appService.allPlayers;
    }

    return this.appService.setAppLoading(this.storeService.loadPlayers());
  }
}
