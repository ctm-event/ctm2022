import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input, Output,
  ViewChild
} from '@angular/core';
import { takeUntil } from 'rxjs';
import { Player } from 'src/app/interface/player.interface';
import { AppService } from '../app.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-grave',
  templateUrl: './grave.component.html',
  styleUrls: ['./grave.component.scss'],
})
export class GraveComponent extends BaseComponent implements AfterViewInit {
  private _player!: Player;
  private _disable: boolean = false;

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

  constructor(private appService: AppService) {
    super();
  }

  ngAfterViewInit(): void {
    this.appService.unitLoading$
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading) => {
        this._disable = isLoading;
        this.handleLoadingClass(isLoading);
      });
  }

  reborn() {
    if (this._disable) return;

    this.wrapper.nativeElement.classList.add('animate__fadeOutUp');
    this.appService.reborn(this.player._id);
  }

  private handleLoadingClass(isLoading: boolean) {
    if (isLoading) {
      this.wrapper.nativeElement.classList.add('wait');
      return;
    }

    this.wrapper.nativeElement.classList.remove('wait');
  }
}
