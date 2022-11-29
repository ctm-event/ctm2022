import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntil, timer } from 'rxjs';
import { AppHelper } from '../app.helper';
import { BaseComponent } from '../base.component';
import {
  BackgroundIntervalDuration,
  DelayBackgroundLoop,
  LoopBackgrounds,
} from './background.constant';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
})
export class BackgroundComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  @Input()
  extraClasses: string[] = [];

  @Input()
  isRandomBg: boolean = false;

  @ViewChild('backgroundHolder') backgroundHolder!: ElementRef;

  private loopBackgrounds: string[] = [];

  constructor(private helper: AppHelper) {
    super();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.isRandomBg) {
      timer(DelayBackgroundLoop, BackgroundIntervalDuration)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.nextBackground());
    }
  }

  private nextBackground() {
    this.resetBackgroundClasses();
    const next = this.loopBackgrounds.splice(0, 1);

    this.backgroundHolder.nativeElement.style.backgroundImage =
      "url('assets/img/background/" + next + "')";
  }

  private resetBackgroundClasses() {
    if (this.loopBackgrounds.length === 0) {
      this.loopBackgrounds = this.helper.shuffle(LoopBackgrounds);
    }
  }
}
