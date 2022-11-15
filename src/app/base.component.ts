import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class BaseComponent {
  protected readonly destroy$: Subject<boolean> = new Subject<boolean>();
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete;
  }
}
