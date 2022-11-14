import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { Player } from './player/player';
import { PlayerStatus } from './player/player-status.constant';

@Injectable({
  providedIn: 'root',
})
export class SquidGameService {
  private _players = [
    {
      id: 123,
      name: 'name1',
      avatar: 'avatar-default.jpg',
      luckyStar: 1,
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
      status: 'dead',
    },
    {
      id: 126,
      name: 'name4',
      avatar: 'avatar-default.jpg',
      luckyStar: 0,
      status: 'alive',
    },
  ];

  public players$: Subject<Player[]> = new BehaviorSubject(this._players);

  get players() {
    return this.players$.asObservable();
  }

  constructor() {}

  kill(ids: number[]): void {
    this._players.forEach((player: Player) => {
      if (this.isPLayerAlive(player)) {
        player = this.executePlayer(player);
      }
    });
  }

  revive(): void {}

  executePlayer(player: Player): Player {
    return this.hasLuckyStar(player)
      ? this.setToStandBy(player)
      : this.setToDead(player);
  }

  public isPLayerAlive(player: Player): boolean {
    return player.status === PlayerStatus.ALIVE;
  }

  public isPlayerStandby(player: Player): boolean {
    return player.status === PlayerStatus.STANDBY;
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
