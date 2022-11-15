import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from './player/player';
import { SquidGameService } from './squid-game.service';

@Component({
  selector: 'app-squid-game',
  templateUrl: './squid-game.component.html',
  styleUrls: ['./squid-game.component.scss'],
})
export class SquidGameComponent implements OnInit {
  public players!: Observable<any>;
  public selectedPlayers: number[] = [];
  public isDisplayActionBar: boolean = false;

  constructor(private squidGameService: SquidGameService) {}

  ngOnInit(): void {
    this.players = this.squidGameService.alivePlayers;
  }

  onSelectHandler(player: Player) {
    this.selectedPlayers.push(player.id);
    this.checkActionBar();
  }

  onDeselectHandler(player: Player) {
    this.selectedPlayers = this.selectedPlayers.filter(
      (id) => id !== player.id
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
