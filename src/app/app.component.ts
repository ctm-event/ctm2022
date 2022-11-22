import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Contemi Year End Party 2022';
  appLoading$!: Observable<boolean>;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appLoading$ = this.appService.appLoading$.asObservable();
  }
}
