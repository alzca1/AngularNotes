import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
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
  uid: string;
  constructor(
    private route: ActivatedRoute,
    private notemaker: NotemakerService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.notes = this.route.snapshot.data.notes;
    this.auth.user.subscribe((user) => {
      this.uid = user.id;
      console.log(this.uid);
    });
    this.notemaker.$notesChanged.subscribe((data) => {
      console.log('updating');
      console.log(data);
      this.notes = data;
    });
  }

  addNote() {
    this.notemaker.addNote();
  }

  // onFetchPosts() {
  //   this.notemaker.fetchPosts().subscribe((notes) => {
  //     this.notes = notes;
  //   });
  // }
}
