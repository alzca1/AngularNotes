import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../note.class';
import { NotemakerService } from '../notemaker.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  notes: Note[];
  isLoading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private notemaker: NotemakerService
  ) {}

  ngOnInit(): void {
    this.notes = this.route.snapshot.data.notes;
    this.notemaker.$notesChanged.subscribe((data) => {
      console.log('updating');
      this.notes = data;
    });
  }

  addNote() {
    this.notemaker.addNote();
  }

  onFetchPosts() {
    this.notemaker.fetchPosts().subscribe((notes) => {
      this.notes = notes;
    });
  }
}
