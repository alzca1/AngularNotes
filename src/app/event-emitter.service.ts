import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventEmitterService {
  invokeNavbarLoginComponent = new Subject();
  subsVar: Subscription;

  constructor() {}

  onInvokeNavbarLoginComponent() {
    this.invokeNavbarLoginComponent.next();
  }
}
