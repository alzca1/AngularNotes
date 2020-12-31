import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  value = '';
  searchValue = new Subject<string>();
  constructor() {}

  search(value) {
    this.value = value;
    this.searchValue.next(value);
    console.log(this.value);
  }
}
