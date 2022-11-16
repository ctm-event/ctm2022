import { Injectable } from '@angular/core';
import { ExplosionIcons } from '../constant/bomb-icon.constant';
import { AppService } from '../app.service';

type Object = { [k: string]: any };

@Injectable({
  providedIn: 'root',
})
export class SquidGameHelper {
  constructor(private service: AppService) {}

  getSelectedIcon() {
    const rand = this.getRandomInt(ExplosionIcons.length);
    return ExplosionIcons[rand];
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}
