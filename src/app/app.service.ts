import { Injectable } from '@angular/core';
import { map, of, Subject } from 'rxjs';
import { AppHelper } from './app.helper';
import { BombStyle } from './constant/bomb-style.constant';
import { Player } from './interface/player.interface';
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

  get allActivePlayers() {
    return this.storeService.players$.asObservable().pipe(
      map((players) => {
        return players.filter((player) => this.helper.isPlayerActive(player));
      })
    );
  }

  get allPlayers() {
    return this.storeService.players$.asObservable();
  }

  constructor(private helper: AppHelper, private storeService: StoreService) {}

  boom(ids: string[]): void {
    const allPlayers = this.storeService.players;
    const updatedPlayers: Player[] = [];
    ids.forEach((id) => {
      const index = allPlayers.findIndex((player) => {
        return player._id === id;
      });

      if (index === -1) {
        return;
      }

      if (this.helper.isPLayerAlive(allPlayers[index])) {
        const updatedPlayer = this.updatePlayerToDeadOrStandby(
          allPlayers[index]
        );
        updatedPlayers.push(updatedPlayer);
        allPlayers[index] = updatedPlayer;
      }
    });

    if (!!updatedPlayers.length) {
      this.storeService.updatePlayers(updatedPlayers);
    }

    this.boom$.next(true);

    // savePlayersWithTimeout: Give it some time to perform animation
    this.storeService.savePlayersWithTimeout(allPlayers);
  }

  revive(): void {
    this.updatePlayersToAlive();
  }

  reborn(id: string): void {
    const allPlayers = this.storeService.players;
    const index = allPlayers.findIndex((player) => player._id === id);

    if (index === -1) return;

    const updated = this.helper.setToAlive(allPlayers[index]);
    allPlayers[index] = updated;
    this.storeService.updatePlayers([updated]);

    this.storeService.savePlayersWithTimeout(allPlayers, 300);
  }

  savePLayer(player: Player) {
    
  }

  private updatePlayerToDeadOrStandby(player: Player): Player {
    return this.helper.hasstar(player)
      ? this.helper.setToStandBy(player)
      : this.helper.setToDead(player);
  }

  private updatePlayersToAlive() {
    const allPlayers = this.storeService.players;
    const updatedPlayers: Player[] = [];

    allPlayers.forEach((player, index) => {
      if (this.helper.isPlayerStandby(player)) {
        allPlayers[index] = this.helper.setToAlive(player);
        updatedPlayers.push(allPlayers[index]);
      }
    });

    if (!!updatedPlayers.length) {
      this.storeService.updatePlayers(updatedPlayers);
    }

    this.storeService.players = allPlayers;
  }
}
