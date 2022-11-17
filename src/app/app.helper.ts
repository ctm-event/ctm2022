import { Injectable } from '@angular/core';
import { Player } from './interface/player.interface';
import { PlayerStatus } from './constant/player-status.constant';

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
    const luckyStar = player.luckyStar - 1;
    return {
      ...player,
      luckyStar,
      status: PlayerStatus.STANDBY,
    };
  }

  setToDead(player: Player): Player {
    return {
      ...player,
      status: PlayerStatus.DEAD,
    };
  }

  setToAlive(player: Player): Player {
    return {
      ...player,
      status: PlayerStatus.ALIVE,
    };
  }
}
