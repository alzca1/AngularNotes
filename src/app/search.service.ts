import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchValue = new Subject<string>();
  constructor() {}

  search(value) {
    this.searchValue.next(value);
  }
}
