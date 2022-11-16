import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { fadeAnimation } from '../animation/fade.animation';
import { Player } from '../interface/player.interface';
import { SquidGameService } from './squid-game.service';

@Component({
  selector: 'app-squid-game',
  templateUrl: './squid-game.component.html',
  styleUrls: ['./squid-game.component.scss'],
  animations: [fadeAnimation],
})
export class SquidGameComponent implements OnInit {
  public players!: Observable<any>;
  public selectedPlayers: string[] = [];
  public isDisplayActionBar: boolean = false;

  constructor(private squidGameService: SquidGameService) {
    // squidGameService.initialize();
  }

  ngOnInit(): void {
    this.players = this.squidGameService.alivePlayers;
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
    this.squidGameService.boom(this.selectedPlayers);
    this.selectedPlayers = [];
  }

  revive() {
    this.squidGameService.revive();
  }

  private checkActionBar() {
    this.isDisplayActionBar = !!this.selectedPlayers.length;
  }
}
