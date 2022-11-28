import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  delay,
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
  currentSelected!: Player;
  notYetSelectedPlayers!: Player[];

  enterAnimationClass: string = 'animate__fadeInLeft';
  enterAnimationClass2: string = 'animate__fadeIn';
  leaveAnimationClass: string = 'animate__fadeOut';

  randomQuoteSubscription!: Subscription;

  @ViewChild('currentAvatar', { read: ElementRef })
  currentAvatar!: ElementRef;

  @ViewChild('currentQuote', { read: ElementRef })
  currentQuote!: ElementRef;

  constructor(private appService: AppService, private helper: AppHelper) {
    super();
  }

  ngOnInit(): void {
    this.players$ = this.appService.allActivePlayers;
  }

  ngAfterViewInit() {
    this.players$.pipe(take(1)).subscribe((players) => {
      this.allPlayers = players;
      this.notYetSelectedPlayers = players;
      this.setRandomQuote();
    });
  }

  setRandomQuote() {
    this.randomQuoteSubscription = timer(1000, 5000)
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.hideQuote()),
        delay(500),
        tap(() => this.prepareNextQuote()),
        delay(50)
      )
      .subscribe(() => this.showQuote());
  }

  prepareNextQuote() {
    console.log('prepare quote');
    if (this.notYetSelectedPlayers.length === 1) {
      this.setSelected(this.notYetSelectedPlayers[0]);
      this.resetNotYetSelectedPlayers();
      return;
    }
    this.setRandomNotYetSelectedPlayer();
  }

  setSelected(player: Player) {
    this.currentSelected = player;
  }

  setRandomNotYetSelectedPlayer() {
    const index = Math.floor(Math.random() * this.notYetSelectedPlayers.length);

    this.setSelected(this.notYetSelectedPlayers[index]);
    this.notYetSelectedPlayers.splice(index, 1);
  }

  resetNotYetSelectedPlayers() {
    this.notYetSelectedPlayers = this.allPlayers.slice();
  }

  getAvatar(player: Player) {
    return this.helper.getPlayerAvatar(player);
  }

  showQuote() {
    console.log('show');
    if (!this.currentSelected) return;
    (this.currentAvatar.nativeElement as HTMLElement).classList.remove(
      this.leaveAnimationClass
    );

    (this.currentQuote.nativeElement as HTMLElement).classList.remove(
      this.leaveAnimationClass
    );
  }

  hideQuote() {
    console.log('hide');
    if (!this.currentSelected) return;
    (this.currentAvatar.nativeElement as HTMLElement).classList.add(
      this.leaveAnimationClass
    );
    (this.currentQuote.nativeElement as HTMLElement).classList.add(
      this.leaveAnimationClass
    );
  }
}
