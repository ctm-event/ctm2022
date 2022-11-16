import { Injectable } from '@angular/core';
import { ExplosionIcons } from '../constant/bomb-icon.constant';

@Injectable({
  providedIn: 'root',
})
export class SquidGameHelper {
  constructor() {}

  getSelectedIcon() {
    const rand = this.getRandomInt(ExplosionIcons.length);
    return ExplosionIcons[rand];
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}
