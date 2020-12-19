import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Output() searchValueEmitted = new EventEmitter();
  value: string;

  constructor() {}

  ngOnInit(): void {}

  searchNotes(value) {
    this.searchValueEmitted.emit(value);
  }
}