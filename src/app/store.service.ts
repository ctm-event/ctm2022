import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  delay,
  map,
  Observable,
  of,
  Subject,
  tap,
} from 'rxjs';
import { AppHelper } from './app.helper';
import { Player } from './interface/player.interface';

const _players: Player[] = [
  {
    _id: '63749da66e13b92cea1eb7d6',
    name: 'Nell Jenkins',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 1,
  },
  {
    _id: '63749da67843d5946a77ca9f',
    name: 'Arsenal',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 0,
  },
  {
    _id: '63749da66551810fb6c24930',
    name: 'Rocha Mcneil',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 0,
  },
  {
    _id: '63749da6a9a7aa12ee781410',
    name: 'Roslyn Kramer',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 1,
  },
  {
    _id: '63749da6f7bc477a359b09a9',
    name: 'Tonia Dalton',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 0,
  },
  {
    _id: '63749da6e0980ccf3e1f0118',
    name: 'Maddox Bernard',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 0,
  },
  {
    _id: '63749da6b03e93fde1b22462',
    name: 'Huffman Moore',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 1,
  },
  {
    _id: '63749da686bf6319c1a97791',
    name: 'Tamera Floyd',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 0,
  },
  {
    _id: '63749da69fc27e333c59ee84',
    name: 'Keisha Garner',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 1,
  },
  {
    _id: '63749da6b6231fdafef16f84',
    name: 'Selena Butler',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 0,
  },
  {
    _id: '63749da6ac2f6b8970f76606',
    name: 'Mavis Snider',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 1,
  },
  {
    _id: '63749da6308140a381e2f24c',
    name: 'Liliana Briggs',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 1,
  },
  {
    _id: '63749da6beac2659fa0e99f2',
    name: 'Berta Kent',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 0,
  },
  {
    _id: '63749da67ee4109d79960985',
    name: 'Wong Solomon',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 1,
  },
  {
    _id: '63749da6c04649b5c1f1e76f',
    name: 'Rosie Turner',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 1,
  },
  {
    _id: '63749da6a580c64943b31d30',
    name: 'Hubbard Whitehead',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 0,
  },
  {
    _id: '63749da60e8dadb725228bd6',
    name: 'Dennis Craft',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 0,
  },
  {
    _id: '63749da6cc7ff0350d5905ed',
    name: 'Linda Cunningham',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 0,
  },
  {
    _id: '63749da6a1908071da259e03',
    name: 'Lora Singleton',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 0,
  },
  {
    _id: '63749da6e5cdd4d4abcc75a0',
    name: 'Roth Bass',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 1,
  },
  {
    _id: '63749da684a0f6529915a14e',
    name: 'Peterson Lowery',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 1,
  },
  {
    _id: '63749da65aea7adb0bbe51cb',
    name: 'Perry Morse',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 0,
  },
  {
    _id: '63749da6f3edfee14f329b73',
    name: 'Beth Dickson',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 1,
  },
  {
    _id: '63749da629e3ba639effb868',
    name: 'Cochran Barrera',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 1,
  },
  {
    _id: '63749da6e75e86e26e165810',
    name: 'Queen Mercer',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 1,
  },
  {
    _id: '63749da634b87fd05fc482a0',
    name: 'Clayton Andrews',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 0,
  },
  {
    _id: '63749da6dbf1db0729c515f2',
    name: 'Burch Freeman',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 0,
  },
  {
    _id: '63749da6c5c3394956abffcf',
    name: 'Nichole Barron',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 1,
  },
  {
    _id: '63749da6251b1d935479b0c8',
    name: 'Mccray Nunez',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 0,
  },
  {
    _id: '63749da6516ab654287e32a6',
    name: 'Levine Obrien',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 0,
  },
  {
    _id: '63749da6de29dca80295943f',
    name: 'Bonita Price',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 1,
  },
  {
    _id: '63749da665929b765fb0467e',
    name: 'Gladys Fields',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 0,
  },
  {
    _id: '63749da69a8fbdc7317472c1',
    name: 'Waller Wood',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 0,
  },
  {
    _id: '63749da6a904a2118ea2aa61',
    name: 'Moreno Ferrell',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 1,
  },
  {
    _id: '63749da6f8580f3aa5646076',
    name: 'Myers Barry',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 1,
  },
  {
    _id: '63749da617eb633145655e88',
    name: 'Rosanna Robbins',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 1,
  },
  {
    _id: '63749da687e092ed8dbaec0f',
    name: 'Mcintyre Lopez',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 0,
  },
  {
    _id: '63749da68fec616e2fb4b211',
    name: 'Gamble Giles',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 1,
  },
  {
    _id: '63749da60f3b672c30cd9d0b',
    name: 'Rosalyn Mcpherson',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 0,
  },
  {
    _id: '63749da65c66a9a311032d98',
    name: 'Donna Evans',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 0,
  },
  {
    _id: '63749da64e7023811e601e27',
    name: 'Lawanda Hewitt',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 1,
  },
  {
    _id: '63749da6297bc40086a8344e',
    name: 'Sweet Finch',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 1,
  },
  {
    _id: '63749da6801617f965f05d24',
    name: 'Mack Silva',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 1,
  },
  {
    _id: '63749da66e4c20fe8d139794',
    name: 'Whitfield Blake',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 0,
  },
  {
    _id: '63749da684438af6a6650eae',
    name: 'Young Hyde',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 0,
  },
  {
    _id: '63749da6d6c220244ae6b83b',
    name: 'Miriam Head',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 1,
  },
  {
    _id: '63749da64e31704a69a8b64c',
    name: 'Snow Daugherty',
    avatar: 'avatar-default.jpg',
    status: 'alive',
    luckyStar: 1,
  },
];

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
    // TODO: replace with http request
    return of(_players).pipe(
      delay(500),
      tap((_players) => {
        this.players = _players;
        this.loaded = true;
      }),
      map((_players) => {
        return _players;
      })
    );
  }

  public updatePlayersToDeadOrStandby(ids: string[]) {
    const allPlayers = this.players;

    ids.forEach((id) => {
      const index = allPlayers.findIndex((player) => {
        return player._id === id;
      });

      if (index === -1) {
        return;
      }

      if (this.helper.isPLayerAlive(allPlayers[index])) {
        allPlayers[index] = this.executePlayer(allPlayers[index]);
      }
    });

    setTimeout(() => {
      this.players = allPlayers;
    }, 1000);
  }

  updatePlayersToAlive() {
    const allPlayers = this.players;
    allPlayers.forEach((player, index) => {
      if (this.helper.isPlayerStandby(player)) {
        allPlayers[index] = this.helper.setToAlive(player);
      }
    });

    this.players = allPlayers;
  }

  executePlayer(player: Player): Player {
    return this.helper.hasLuckyStar(player)
      ? this.helper.setToStandBy(player)
      : this.helper.setToDead(player);
  }
}
