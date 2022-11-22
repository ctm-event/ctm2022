import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject, noop,
  Observable, Subject,
  tap
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppHelper } from './app.helper';
import { Player } from './interface/player.interface';

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
    return this.http.get<Player[]>(environment.apiUrl).pipe(
      tap((_players) => {
        this.players = _players;
        this.loaded = true;
      })
    );
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
