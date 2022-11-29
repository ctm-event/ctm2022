import {
  Component,
  ElementRef,
  HostBinding, OnInit,
  ViewChild
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/base.component';
import { environment } from 'src/environments/environment';
import { AppService } from '../../app.service';
import { SquidGameHelper } from '../../squid-game/squid-game.helper';

@Component({
  selector: 'app-dynamite',
  templateUrl: './dynamite.component.html',
  styleUrls: ['./dynamite.component.scss'],
})
export class DynamiteComponent extends BaseComponent implements OnInit {
  @HostBinding('style') style: SafeStyle = {
    position: 'absolute',
    cursor: 'grab',
  };

  @HostBinding('style.top')
  top: SafeStyle = this.sanitizer.bypassSecurityTrustStyle('0');

  @HostBinding('style.left')
  left: SafeStyle = this.sanitizer.bypassSecurityTrustStyle('0');

  @ViewChild('img', { read: ElementRef<HTMLImageElement> })
  imgTag!: ElementRef<HTMLImageElement>;
  public imgSrc!: string;

  constructor(
    private service: AppService,
    private sanitizer: DomSanitizer,
    helper: SquidGameHelper
  ) {
    super();
    this.imgSrc = helper.getSelectedIcon();
  }

  ngOnInit(): void {
    this.service.boom$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.explode = () => {
        this.onExplode();
        nativeElement.style.transform = 'scale(1.7)';
        nativeElement.className =
          'animate__animated animate__zoomIn animate__fast';
        setTimeout(() => {
          nativeElement.classList.add('animate__zoomOut');
        }, 600);
        setTimeout(() => {
          this.deSelect();
        }, 1000);
      };
      const nativeElement = this.imgTag.nativeElement;
      nativeElement.src = environment.baseHref + '/assets/img/explosion.png';
    });
  }

  onLoad() {
    this.explode();
  }

  explode(): void {}

  // This method is instanciate by parent Component
  deSelect(): void {}

  // This method is instanciate by parent Component
  onExplode(): void {}
}
