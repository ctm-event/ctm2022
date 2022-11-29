import { Injectable } from '@angular/core';
import { Player } from './interface/player.interface';
import { PlayerStatus } from './constant/player-status.constant';
import { PlayerStatusItem } from './interface/player-status-item.interface';

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

  isPlayerDeactive(player: Player): boolean {
    return player.status === PlayerStatus.DEACTIVE;
  }

  isPlayerActive(player: Player): boolean {
    return player.status !== PlayerStatus.DEACTIVE;
  }

  hasstar(player: Player): boolean {
    return player.star > 0;
  }

  setToStandBy(player: Player): Player {
    const star = player.star - 1;
    return {
      ...player,
      star,
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

  getListPlayerStatuses(): PlayerStatusItem[] {
    const statuses = [];
    for (const key in PlayerStatus) {
      statuses.push({
        key: key,
        value: (PlayerStatus as { [k: string]: string })[key],
      });
    }
    return statuses;
  }

  getAvatar(player: Player): string {
    return player.avatar || 'assets/avatar/' + player.number + '.png';
  }

  getRandomColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
  }

  shuffle(inputArray: any[]) {
    const array = [...inputArray];
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
}
