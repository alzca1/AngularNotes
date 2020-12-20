import { Component, OnInit } from '@angular/core';
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
  constructor(
    private route: ActivatedRoute,
    private notemaker: NotemakerService,
    private auth: AuthService
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
}
