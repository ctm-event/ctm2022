import { Injectable } from '@angular/core';
import { ExplosionIcons } from '../constant/bomb-icon.constant';
import { SquidGameService } from './squid-game.service';

type Object = { [k: string]: any };

@Injectable({
  providedIn: 'root',
})
export class SquidGameHelper {
  constructor(private service: SquidGameService) {}

  getSelectedIcon() {
    const rand = this.getRandomInt(ExplosionIcons.length);
    return ExplosionIcons[rand];
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}
