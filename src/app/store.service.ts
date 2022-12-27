import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject, noop,
  Observable, of, Subject,
  tap
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppHelper } from './app.helper';
import { Player } from './interface/player.interface';
import { _players } from './squid-game/players.mock';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private http: HttpClient, private helper: AppHelper) {}
  private _players: Player[] = [];
  loaded: boolean = false;

  set players(players: Player[]) {
    this._players = players;
    this.players$.next(this.players);
  }

  get players(): Player[] {
    return [...this._players];
  }

  public players$: Subject<Player[]> = new BehaviorSubject<Player[]>([]);

  loadPlayers(): Observable<Player[]> {
    return of<Player[]>(_players).pipe(
      tap((_players) => {
        this.players = _players;
        this.loaded = true;
      })
    );

    // return this.http.get<Player[]>(environment.apiUrl).pipe(
    //   tap((_players) => {
    //     this.players = _players;
    //     this.loaded = true;
    //   })
    // );
  }

  updateAllPlayers() {
    this.http.patch<Player[]>(environment.apiUrl, this.players).subscribe(noop);
  }

  updatePlayers(players: Player[]) {
    return this.http.patch<Player[]>(environment.apiUrl, players);
  }

  savePlayersWithTimeout(players: Player[], timeout: number = 1000) {
    setTimeout(() => {
      this.players = players;
    }, timeout);
  }
}
