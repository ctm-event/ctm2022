import {
  Component, ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Player } from 'src/app/interface/player.interface';
import { AppHelper } from '../app.helper';
import { AppService } from '../app.service';

@Component({
  selector: 'app-grave',
  templateUrl: './grave.component.html',
  styleUrls: ['./grave.component.scss'],
})
export class GraveComponent implements OnInit {
  private _player!: Player;

  @Output()
  onSelect: EventEmitter<Player> = new EventEmitter<Player>();

  @Input()
  set player(value: Player) {
    this._player = value;
  }

  get player(): Player {
    return this._player;
  }

  constructor(
    private appService: AppService,
    private elmRef: ElementRef,
    private helper: AppHelper
  ) {
  }

  ngOnInit(): void {

  }

  onPlayerSelect($event: MouseEvent) {
  }

}
