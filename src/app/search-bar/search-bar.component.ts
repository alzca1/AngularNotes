import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Subject } from 'rxjs';
import { NotemakerService } from '../notemaker.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  animations: [
    trigger('placeholder', [
      state(
        'normal',
        style({
          transform: 'translateX(0) scale(1,1)',
          fontSize: '1.2rem',
          position: 'absolute',
          top: '20px',
          left: '70px',
          opacity: '1',
          color: '#a9a9a9',
        })
      ),
      state(
        'selected',
        style({
          display: 'block',
          opacity: 1,
          transform: 'translate(-20px, -20px) scale(0.5, 0.5)',
        })
      ),
      transition('normal <=> selected', animate(300)),
    ]),
  ],
})
export class SearchBarComponent implements OnInit {
  @Output() searchValueEmitted = new EventEmitter();
  @Output() toggleSearchBar = new EventEmitter();
  state = 'normal';
  value: string;

  constructor(
    private notemaker: NotemakerService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {}

  searchNotes(value) {
    if (value === '') {
      this.value = '';
    }
    this.searchService.search(value);
  }

  clearField() {
    this.value = '';
    console.log(this.value);
    // this.searchValueEmitted.emit('');
  }

  toggleSearch() {
    this.toggleSearchBar.emit();
  }

  toggleAnimation() {
    if (this.value && this.state === 'selected') {
      return;
    }
    this.state === 'normal'
      ? (this.state = 'selected')
      : (this.state = 'normal');
  }
}
