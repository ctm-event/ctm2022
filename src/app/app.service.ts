import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subject } from 'rxjs';
import { AppHelper } from './app.helper';
import { BombStyle } from './constant/bomb-style.constant';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _bombStyle: BombStyle = BombStyle.EXPLOSION;

  get bombStyle(): BombStyle {
    return this._bombStyle;
  }

  set bombStyle(value: BombStyle) {
    this.bombStyle = value;
  }

  public boom$: Subject<any> = new Subject();

  get alivePlayers() {
    return this.storeService.players$.asObservable().pipe(
      map((players) => {
        return players.filter(
          (player) =>
            this.helper.isPLayerAlive(player) ||
            this.helper.isPlayerStandby(player)
        );
      })
    );
  }

  get deadPlayers() {
    return this.storeService.players$.asObservable().pipe(
      map((players) => {
        return players.filter((player) => this.helper.isPlayerDead(player));
      })
    );
  }

  get allPlayers() {
    return this.storeService.players$.asObservable();
  }

  constructor(private helper: AppHelper, private storeService: StoreService) {}

  boom(ids: string[]): void {
    this.storeService.updatePlayersToDeadOrStandby(ids);
    this.boom$.next(true);
  }

  revive(): void {
    this.storeService.updatePlayersToAlive();
  }
}
