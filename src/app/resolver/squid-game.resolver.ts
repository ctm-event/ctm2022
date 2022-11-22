import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { finalize, Observable, of, shareReplay } from 'rxjs';
import { Player } from '../interface/player.interface';
import { AppService } from '../app.service';
import { StoreService } from '../store.service';

@Injectable()
export class SquidGameResolver implements Resolve<Player[]> {
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
