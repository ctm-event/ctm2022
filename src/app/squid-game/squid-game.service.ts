import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Subject } from 'rxjs';
import { BombStyle } from '../constant/bomb-style.constant';
import { Player } from './player/player';
import { PlayerStatus } from './player/player-status.constant';

@Injectable({
  providedIn: 'root',
})
export class SquidGameService {
  private _players: Player[] = [
    {
      id: 123,
      name: 'name1',
      avatar: 'avatar-default.jpg',
      luckyStar: 0,
      status: 'standby',
    },
    {
      id: 124,
      name: 'name2',
      avatar: 'avatar-default.jpg',
      luckyStar: 1,
      status: 'alive',
    },
    {
      id: 125,
      name: 'name3',
      avatar: 'avatar-default.jpg',
      luckyStar: 0,
      status: 'alive',
    },
    {
      id: 126,
      name: 'name4',
      avatar: 'avatar-default.jpg',
      luckyStar: 0,
      status: 'alive',
    },
  ];

  private _bombStyle: BombStyle = BombStyle.EXPLOSION;

  get bombStyle(): BombStyle {
    return this._bombStyle;
  }

  set bombStyle(value: BombStyle) {
    this.bombStyle = value;
  }

  public players$: Subject<Player[]> = new BehaviorSubject(
    this._players.slice()
  );
  public boom$: Subject<any> = new Subject();

  get players() {
    return this.players$.asObservable();
  }

  get alivePlayers() {
    return this.players$.asObservable().pipe(
      map((players) => {
        return players.filter(
          (player) => this.isPLayerAlive(player) || this.isPlayerStandby(player)
        );
      })
    );
  }

  constructor() {}

  boom(ids: number[]): void {
    ids.forEach((id) => {
      const index = this._players.findIndex((player) => {
        return player.id === id;
      });

      if (index === -1) {
        return;
      }

      if (this.isPLayerAlive(this._players[index])) {
        this._players[index] = this.executePlayer(this._players[index]);
      }
    });

    this.boom$.next(true);
    setTimeout(() => {
      this.players$.next(this._players);
    }, 1000);
  }

  revive(): void {
    this._players.forEach((player) => {
      if (this.isPlayerStandby(player)) {
        player = this.setToAlive(player);
      }
    });
    this.players$.next(this._players);
  }

  executePlayer(player: Player): Player {
    player.selected = false;

    return this.hasLuckyStar(player)
      ? this.setToStandBy(player)
      : this.setToDead(player);
  }

  public isPLayerAlive(player: Player): boolean {
    return player.status === PlayerStatus.ALIVE;
  }

  public isPlayerSelected(player: Player) {
    return !!player.selected;
  }

  public isPlayerStandby(player: Player): boolean {
    return player.status === PlayerStatus.STANDBY;
  }

  public isPlayerDead(player: Player): boolean {
    return player.status === PlayerStatus.DEAD;
  }

  public hasLuckyStar(player: Player): boolean {
    return player.luckyStar > 0;
  }

  private setToStandBy(player: Player): Player {
    player.luckyStar -= 1;
    player.status = PlayerStatus.STANDBY;
    return player;
  }

  private setToDead(player: Player): Player {
    player.status = PlayerStatus.DEAD;
    return player;
  }

  private setToAlive(player: Player): Player {
    player.status = PlayerStatus.ALIVE;
    return player;
  }
}
