import { Injectable } from '@angular/core';
import { Player } from './interface/player.interface';
import { PlayerStatus } from './player/player-status.constant';

@Injectable({ providedIn: 'root' })
export class AppHelper {
  isPLayerAlive(player: Player): boolean {
    return player.status === PlayerStatus.ALIVE;
  }

  isPlayerSelected(player: Player) {
    return !!player.selected;
  }

  isPlayerStandby(player: Player): boolean {
    return player.status === PlayerStatus.STANDBY;
  }

  isPlayerDead(player: Player): boolean {
    return player.status === PlayerStatus.DEAD;
  }

  hasLuckyStar(player: Player): boolean {
    return player.luckyStar > 0;
  }

  setToStandBy(player: Player): Player {
    player.luckyStar -= 1;
    player.status = PlayerStatus.STANDBY;
    return player;
  }

  setToDead(player: Player): Player {
    player.status = PlayerStatus.DEAD;
    return player;
  }

  setToAlive(player: Player): Player {
    player.status = PlayerStatus.ALIVE;
    return player;
  }
}
