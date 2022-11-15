import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/base.component';
import { environment } from 'src/environments/environment';
import { SquidGameService } from '../../squid-game.service';

@Component({
  selector: 'app-dynamite',
  templateUrl: './dynamite.component.html',
  styleUrls: ['./dynamite.component.scss'],
})
export class DynamiteComponent extends BaseComponent implements OnInit {
  @HostBinding('style') style: SafeStyle = {
    position: 'absolute',
    cursor: 'grab',
    top: '0',
    left: '0',
  };

  @HostBinding('style.top')
  top: SafeStyle = this.sanitizer.bypassSecurityTrustStyle('auto');

  @HostBinding('style.left')
  left: SafeStyle = this.sanitizer.bypassSecurityTrustStyle('auto');

  @Input() set x(value: string) {
    this.left = value;
  }

  @Input() set y(value: string) {
    this.top = value;
  }

  @ViewChild('img', { read: ElementRef<HTMLImageElement> })
  imgTag!: ElementRef<HTMLImageElement>;
  public imgSrc: string = environment.baseHref + '/assets/img/dynamite_cursor.png';

  constructor(
    private service: SquidGameService,
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  ngOnInit(): void {
    this.service.boom$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      const nativeElement = this.imgTag.nativeElement;
      nativeElement.src = environment.baseHref + "/assets/img/explosion.png";
      this.top = '0px';
      this.left = '0px';
      nativeElement.style.transform = 'scale(1.7)';
      nativeElement.className =
        'animate__animated animate__zoomIn animate__fastest';
      setTimeout(() => {
        nativeElement.classList.add('animate__zoomOut');
        this.deSelect();
      }, 450);
    });
  }

  deSelect(): void {}
}
