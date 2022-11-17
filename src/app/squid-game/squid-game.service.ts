import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export class SquidGameService {
  public addSelectedPlayer$: Subject<number> = new Subject<number>();
}
