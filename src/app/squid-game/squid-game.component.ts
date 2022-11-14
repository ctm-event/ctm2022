import { Component, ElementRef, OnInit } from '@angular/core';
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
  private elm: HTMLElement;

  constructor(
    private squidGameService: SquidGameService,
    private elmRef: ElementRef
  ) {
    this.players = squidGameService.players;
    this.elm = elmRef.nativeElement;
  }

  ngOnInit(): void {}

  onPlayerSelect(player: Player, $event: MouseEvent) {
    console.log($event.clientX, $event.clientY);

    const dynamite = document.createElement('img');
    dynamite.className = 'dynamite';
    dynamite.src = '/assets/img/dynamite_cursor.png';
    dynamite.style.position = 'fixed';
    dynamite.style.top = $event.clientY + 'px';
    dynamite.style.left = $event.clientX + 'px';
    this.elm.appendChild(dynamite);

    if (!this.squidGameService.isPLayerAlive(player)) return;
    player.selected = !!player.selected ? false : true;
  }

  kill() {
    if (!this.selectedPlayers.length) return;

    this.squidGameService.kill(this.selectedPlayers);
  }

  boom() {
    const selectedElements = this.elm.getElementsByClassName('selected');
    const selectedElementsLength = selectedElements.length;
    const boom = document.createElement('div');
    boom.className = 'boom';
    for (let i = 0; i < selectedElementsLength; i++) {
      selectedElements.item(i)?.appendChild(boom);
    }
  }

  private setSelected(player: Player) {
    player.selected = true;
  }

  private setUnselected(player: Player) {
    player.selected = false;
  }
}
