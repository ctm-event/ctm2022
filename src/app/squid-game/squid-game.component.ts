import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import party from 'party-js';
import { Observable, shareReplay, take, takeUntil, tap, timer } from 'rxjs';
import { fadeAnimation } from '../animation/fade.animation';
import { AppService } from '../app.service';
import { BaseComponent } from '../base.component';
import { Player } from '../interface/player.interface';
import { SquidGameService } from './squid-game.service';

@Component({
  selector: 'app-squid-game',
  templateUrl: './squid-game.component.html',
  styleUrls: ['./squid-game.component.scss'],
  animations: [fadeAnimation],
  providers: [SquidGameService],
})
export class SquidGameComponent extends BaseComponent implements OnInit {
  public players$!: Observable<any>;
  public selectedPlayers: Player[] = [];
  public isDisplayActionBar: boolean = false;
  public totalStars: number = 0;
  public totalPlayers: number = 0;

  public addSelectedPlayersForm = new FormGroup({
    number: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.maxLength(2),
    ]),
  });

  constructor(
    private appService: AppService,
    private squidGameService: SquidGameService,
    private elemRef: ElementRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.initiliaze();
  }

  onSelectHandler(player: Player) {
    this.selectedPlayers.push(player);
    this.checkActionBar();
  }

  onDeselectHandler(player: Player) {
    this.selectedPlayers = this.selectedPlayers.filter(
      (selectedPlayer) => selectedPlayer._id !== player._id
    );
    this.checkActionBar();
  }

  boom() {
    const ids: string[] = this.selectedPlayers.map((player) => player._id);
    this.appService.boom(ids);
    this.selectedPlayers = [];
    this.checkActionBar();
  }

  revive() {
    this.appService.revive();
  }

  onSubmit() {
    if (this.addSelectedPlayersForm.invalid) {
      return;
    }

    const formControl = this.addSelectedPlayersForm.get('number')!;
    const number = +formControl.value!;

    this.squidGameService.addSelectedPlayer$.next(number);
    formControl.setValue('');
  }

  private checkActionBar() {
    this.isDisplayActionBar = !!this.selectedPlayers.length;
  }

  private initiliaze() {
    this.players$ = this.appService.alivePlayers.pipe(
      shareReplay(),
      tap((players: Player[]) => {
        if (players.length === 1) {
          this.throwConfetti();
        }
        this.totalStars = players.filter((p) => p.star > 0).length;
      })
    );
    this.appService.allBattlePlayers.pipe(take(1)).subscribe((players) => {
      this.totalPlayers = players.length;
    });
  }

  private throwConfetti() {
    timer(0, 1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        party.confetti(this.elemRef.nativeElement, {
          count: party.variation.range(25, 50),
        });
      });
  }
}
