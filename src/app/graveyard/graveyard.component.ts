import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { fadeAnimation } from '../animation/fade.animation';
import { AppService } from '../app.service';
import { Player } from '../interface/player.interface';

@Component({
  selector: 'app-graveyard',
  templateUrl: './graveyard.component.html',
  styleUrls: ['./graveyard.component.scss'],
  animations: [fadeAnimation],
})
export class GraveyardComponent implements OnInit {
  public players!: Observable<any>;
  public selectedPlayers: string[] = [];
  public isDisplayActionBar: boolean = false;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.players = this.appService.deadPlayers;
  }

  onSelectHandler(player: Player) {
    this.selectedPlayers.push(player._id);
    this.checkActionBar();
  }

  onDeselectHandler(player: Player) {
    this.selectedPlayers = this.selectedPlayers.filter(
      (id) => id !== player._id
    );
    this.checkActionBar();
  }

  boom() {
    this.appService.boom(this.selectedPlayers);
    this.selectedPlayers = [];
  }

  revive() {
    this.appService.revive();
  }

  private checkActionBar() {
    this.isDisplayActionBar = !!this.selectedPlayers.length;
  }
}
