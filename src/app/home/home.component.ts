import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { fadeAnimation } from '../animation/fade.animation';
import { AppHelper } from '../app.helper';
import { AppService } from '../app.service';
import { Player } from '../interface/player.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeAnimation]
})
export class HomeComponent implements OnInit{
  players$!: Observable<Player[]>;

  constructor(private appService: AppService, private helper: AppHelper) {}

  ngOnInit(): void {
    this.players$ = this.appService.allActivePlayers;
  }

  getAvatar(player: Player) {
    return this.helper.getPlayerAvatar(player);
  }
}
