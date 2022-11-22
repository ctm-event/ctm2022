import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  loading$!: BehaviorSubject<boolean>;
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.loading$ = this.appService.unitLoading$;
  }
}
