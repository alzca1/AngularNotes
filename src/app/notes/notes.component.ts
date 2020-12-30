import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Note } from '../note.class';
import { NotemakerService } from '../notemaker.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { MatButtonToggleAppearance } from '@angular/material/button-toggle';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  animations: [
    trigger('searchState', [
      state(
        'hidden',
        style({
          transform: 'translateX(-275px)',
        })
      ),
      state(
        'visible',
        style({
          transform: 'translateX(-25px)',
        })
      ),
      transition('hidden <=> visible', animate('300ms ease')),
    ]),
  ],
})
export class NotesComponent implements OnInit {
  notes: Note[];
  isLoading: boolean = false;
  uid: string;
  dataCopy: Note[];
  state = 'hidden';
  selectedVal: string;
  @Input() appearance: MatButtonToggleAppearance;
  constructor(
    private route: ActivatedRoute,
    private notemaker: NotemakerService,
    private auth: AuthService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.notes = this.route.snapshot.data.notes;
    this.dataCopy = this.route.snapshot.data.notes;
    this.auth.user.subscribe((user) => {
      this.uid = user.id;
    });
    this.notemaker.$notesChanged.subscribe((data) => {
      this.notes = data;
      this.dataCopy = data;
    });
    this.selectedVal = 'first-created';
    this.searchService.searchValue.subscribe((value) => {
      console.log('searching');
      this.logSearchString(value);
    });
  }

  addNote() {
    this.notemaker.addNote();
  }

  logSearchString(event) {
    this.notes = this.dataCopy;
    if (!event) {
      return (this.notes = this.dataCopy);
    }
    this.notes = this.notes.filter((element) => {
      const regExp = new RegExp(event, 'i');
      return element.title.match(regExp) || element.content.match(regExp);
    });
  }

  onToggleSearchBar() {
    this.state === 'hidden'
      ? (this.state = 'visible')
      : (this.state = 'hidden');
  }

  notesOrderMode(mode) {
    console.log('notesOrderMode');
    this.notemaker.orderMode = mode;
    this.notemaker.updateFetchPosts();
  }

  onValChange(selectedVal) {
    this.selectedVal = selectedVal;
  }
}
