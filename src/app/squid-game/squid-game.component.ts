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
  public players: Observable<any>;
  public selectedPlayers: number[] = [];

  constructor(private squidGameService: SquidGameService) {
    this.players = squidGameService.players;
  }

  ngOnInit(): void {}

  onPlayerSelect(player: Player) {
    if (!this.squidGameService.isPLayerAlive(player)) return;
    player.selected = !!player.selected ? false : true;
  }

  kill() {
    if (!this.selectedPlayers.length) return;

    this.squidGameService.kill(this.selectedPlayers);
  }

  private setSelected(player: Player) {
    player.selected = true;
  }

  private setUnselected(player: Player) {
    player.selected = false;
  }
}
