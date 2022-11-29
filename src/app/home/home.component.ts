import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  delay,
  noop,
  Observable,
  Subscription,
  take,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { fadeAnimation } from '../animation/fade.animation';
import { AppHelper } from '../app.helper';
import { AppService } from '../app.service';
import { BaseComponent } from '../base.component';
import { Player } from '../interface/player.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeAnimation],
})
export class HomeComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  players$!: Observable<Player[]>;
  allPlayers!: Player[];
  currentQuote!: Player;
  quotes!: Player[];

  leaveAnimationClass: string = 'animate__fadeOut';

  randomQuoteSubscription!: Subscription;

  @ViewChild('currentAvatar', { read: ElementRef })
  currentAvatar!: ElementRef;

  @ViewChild('currentQuoteHolder', { read: ElementRef })
  currentQuoteHolder!: ElementRef;

  constructor(private appService: AppService, private helper: AppHelper) {
    super();
  }

  ngOnInit(): void {
    this.players$ = this.appService.allActivePlayers;
  }

  ngAfterViewInit() {
    this.players$.pipe(take(1)).subscribe((players) => {
      this.allPlayers = [...players];
      this.resetQuotes();
      this.startQuoteLoop();
    });
  }

  getAvatar(player: Player) {
    return this.helper.getAvatar(player);
  }

  onCurrentAvatarLoaded() {
    this.showQuote();
  }

  onCurrentAvatarError(event: any) {
    event.target.src = 'assets/avatar/avatar-default.jpg';
  }

  private startQuoteLoop() {
    this.randomQuoteSubscription = timer(1000, 5000)
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.hideQuote()),
        delay(500),
        tap(() => this.prepareNextQuote())
      )
      .subscribe(noop);
  }

  private hideQuote() {
    if (!this.currentQuote) return;
    (this.currentAvatar.nativeElement as HTMLElement).classList.add(
      this.leaveAnimationClass
    );
    (this.currentQuoteHolder.nativeElement as HTMLElement).classList.add(
      this.leaveAnimationClass
    );
  }

  private prepareNextQuote() {
    if (!this.quotes.length) return;

    const next = this.quotes.splice(0, 1);
    this.setSelected(next[0]);

    this.resetQuoteListIfAllShown();
  }

  private resetQuoteListIfAllShown() {
    if (!this.quotes.length) {
      this.resetQuotes();
    }
  }

  private showQuote() {
    if (!this.currentQuote) return;
    (this.currentAvatar.nativeElement as HTMLElement).classList.remove(
      this.leaveAnimationClass
    );

    (this.currentQuoteHolder.nativeElement as HTMLElement).classList.remove(
      this.leaveAnimationClass
    );
  }

  private setSelected(player: Player) {
    this.currentQuote = player;
  }

  private resetQuotes() {
    this.quotes = this.helper.shuffle([...this.allPlayers]);
    if (this.quotes.length && this.quotes[0]._id === this.currentQuote?._id) {
      this.resetQuotes();
    }
  }
}
