import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { NotemakerService } from './notemaker.service';

@Injectable()
export class Resolver implements Resolve<Observable<any>> {
  constructor(private noteMaker: NotemakerService) {}

  resolve() {
    return this.noteMaker.fetchPosts();
  }
}
