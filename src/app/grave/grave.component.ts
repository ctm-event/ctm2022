import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
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

  @ViewChild('wrapper', { read: ElementRef<HTMLElement> })
  wrapper!: ElementRef<HTMLElement>;

  @Output()
  onSelect: EventEmitter<Player> = new EventEmitter<Player>();

  @Input()
  set player(input: Player) {
    this._player = { ...input };
  }

  get player(): Player {
    return this._player;
  }

  constructor(private appService: AppService, private elmRef: ElementRef) {}

  ngOnInit(): void {}

  reborn() {
    this.wrapper.nativeElement.classList.add('animate__backOutLeft');
    this.appService.reborn(this.player._id);
  }
}
