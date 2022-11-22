import { Component, OnInit } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { AppService } from '../app.service';
import { BaseComponent } from '../base.component';
import { Player } from '../interface/player.interface';
import { PlayerStatus } from '../constant/player-status.constant';
import { fadeAnimation } from '../animation/fade.animation';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [fadeAnimation]
})
export class AdminComponent extends BaseComponent implements OnInit {
  public allPlayers$!: Observable<Player[]>;
  public playerStatuses: { key: string; value: string }[] = [];

  constructor(private appService: AppService) {
    super();
  }

  ngOnInit(): void {
    this.initilize();
  }

  onPlayerSave(player: Player) {
    //
  }

  initilize() {
    this.allPlayers$ = this.appService.allPlayers;
  }
}
