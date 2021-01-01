import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  redirection: boolean;
  constructor(
    private eventEmitter: EventEmitterService,
    private router: Router
  ) {}

  ngOnInit() {}

  openDialog() {
    this.eventEmitter.onInvokeNavbarLoginComponent();
  }

  checkRedirection() {
    return !!localStorage.getItem('userData');
  }
}
