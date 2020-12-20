import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Output() searchValueEmitted = new EventEmitter();
  @Output() toggleSearchBar = new EventEmitter();

  value: string;

  constructor() {}

  ngOnInit(): void {}

  searchNotes(value) {
    if (value === '') {
      this.value = '';
    }
    this.searchValueEmitted.emit(value);
  }

  clearField() {
    this.value = '';
    console.log(this.value);
    // this.searchValueEmitted.emit('');
  }

  toggleSearch() {
    this.toggleSearchBar.emit();
  }
}
