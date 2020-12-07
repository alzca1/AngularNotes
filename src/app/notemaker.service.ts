import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Note } from './note.class';

import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotemakerService {
  $notesChanged = new Subject<any>();
  private notes: Note[] = [];
  private baseUrl = 'https://notesapp-b2c5d-default-rtdb.firebaseio.com/';
  private notesUrl =
    'https://notesapp-b2c5d-default-rtdb.firebaseio.com/notes.json';

  constructor(private http: HttpClient) {}

  addNote() {
    const newNote = new Note('Type a title', 'Type content');
    this.http.post(this.notesUrl, newNote).subscribe((message) => {
      this.fetchPosts().subscribe((data) => {
        this.notes = data;
        this.$notesChanged.next(this.notes);
      });
    });
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  fetchPosts() {
    return this.http.get(this.notesUrl).pipe(
      map((response) => {
        const notes = [];
        for (let key in response) {
          if (response.hasOwnProperty(key)) {
            notes.push({ ...response[key], id: key });
          }
        }
        this.notes = notes;
        return this.notes;
      })
    );
  }

  updateNote(id, title, content) {
    const noteUrl = this.baseUrl + 'notes/' + id + '.json';
    const newTitle = title.nativeElement.innerText;
    const newContent = content.nativeElement.innerText;
    // const updatedNotes = this.notes.slice();
    this.http
      .patch(noteUrl, {
        title: newTitle,
        content: newContent,
      })
      .subscribe((data) => {
        console.log(data);
        this.fetchPosts().subscribe((response) => {
          this.notes = response;
          this.$notesChanged.next(this.notes);
        });
      });
  }

  removeNote(id) {
    const noteUrl = this.baseUrl + 'notes/' + id + '.json';
    return this.http.delete(noteUrl).subscribe((data) => {
      this.fetchPosts().subscribe((response) => {
        this.notes = response;
        this.$notesChanged.next(this.notes);
      });
    });
  }
}
