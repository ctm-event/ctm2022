import {
  Component,
  HostBinding,
  Input,
  OnInit,
  Sanitizer,
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
})
export class BackgroundComponent implements OnInit {
  @Input()
  bgColor: string = 'none';

  // background-color: #ffe1fe;

  constructor() {}

  ngOnInit(): void {}
}
