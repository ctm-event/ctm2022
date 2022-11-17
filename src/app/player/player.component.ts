import {
  Component,
  ComponentRef, EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { filter, takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/base.component';
import { Player } from 'src/app/interface/player.interface';
import { fadeAnimation } from '../animation/fade.animation';
import { AppHelper } from '../app.helper';
import { AppService } from '../app.service';
import { DynamiteComponent } from './dynamite/dynamite.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  animations: [fadeAnimation],
})
export class PlayerComponent extends BaseComponent implements OnInit {
  private _player!: Player;

  @Input()
  set player(input: Player) {
    this._player = { ...input };
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
    private appService: AppService,
    private helper: AppHelper
  ) {
    super();
  }

  ngOnInit(): void {
    this.appService.boom$
      .pipe(
        filter(() => this.helper.isPlayerSelected(this.player)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.out = true;
      });
  }

  onPlayerSelect() {
    if (!this.helper.isPLayerAlive(this.player)) return;

    if (!!this.player.selected) {
      this.deSelect();
      return;
    }

    this.select();
  }

  select() {
    this.player.selected = true;
    this.dynamiteCmpRef = this.placeHolder.createComponent(DynamiteComponent);
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
