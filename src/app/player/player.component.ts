import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { takeUntil } from 'rxjs';
import { fadeAnimation } from 'src/app/animation/fade.animation';
import { BaseComponent } from 'src/app/base.component';
import { Player } from 'src/app/interface/player.interface';
import { AppHelper } from '../app.helper';
import { SquidGameService } from '../squid-game/squid-game.service';
import { DynamiteComponent } from './dynamite/dynamite.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent extends BaseComponent implements OnInit {
  private _player!: Player;

  @Input()
  set player(value: Player) {
    this._player = value;
  }

  get player(): Player {
    return this._player;
  }

  @Output()
  onSelect: EventEmitter<Player> = new EventEmitter();

  @Output()
  onDeselect: EventEmitter<Player> = new EventEmitter();

  @ViewChild('placeHolder', { read: ViewContainerRef })
  placeHolder!: ViewContainerRef;

  dynamite!: HTMLElement;
  dynamiteCmpRef!: ComponentRef<DynamiteComponent>;
  out: boolean = false;

  constructor(
    private squidGameService: SquidGameService,
    private elmRef: ElementRef,
    private helper: AppHelper
  ) {
    super();
  }

  ngOnInit(): void {
    this.squidGameService.boom$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.helper.isPlayerDead(this.player)) {
        this.out = true;
      }
    });
  }

  onPlayerSelect($event: MouseEvent) {
    if (!this.helper.isPLayerAlive(this.player)) return;

    if (!!this.player.selected) {
      this.deSelect();
      return;
    }

    this.select($event);
  }

  select($event: MouseEvent) {
    const elmRect = this.elmRef.nativeElement.getBoundingClientRect();
    this.player.selected = true;
    this.dynamiteCmpRef = this.placeHolder.createComponent(DynamiteComponent);
    // this.dynamiteCmpRef.instance.x = $event.clientX - elmRect.x + '0px';
    // this.dynamiteCmpRef.instance.y = $event.clientY - elmRect.y + '0px';
    this.dynamiteCmpRef.instance.deSelect = () => this.deSelect();
    this.onSelect.emit(this.player);
  }

  deSelect() {
    this.player.selected = false;

    if (!!this.dynamiteCmpRef) {
      this.dynamiteCmpRef.destroy();
    }

    this.onDeselect.emit(this.player);
  }
}
