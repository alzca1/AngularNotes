import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Note } from './note.class';

import { exhaustMap, map, mergeMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotemakerService implements OnInit {
  $notesChanged = new Subject<any>();
  private notes: Note[] = [];
  private uid: string;
  private baseUrl = 'https://notesapp-b2c5d-default-rtdb.firebaseio.com/users/';

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit() {}

  onFetchPosts() {
    this.fetchPosts();
  }

  addNote() {
    const newNote = new Note('Type a title', 'Type content');
    const notesUrl = this.baseUrl + this.uid + '/notes.json';
    this.http.post(notesUrl, newNote).subscribe((message) => {
      this.fetchPosts().subscribe((data) => {
        this.notes = data;
        this.$notesChanged.next(this.notes);
      });
    });
  }

  fetchPosts() {
    this.updateUserId();
    return this.http.get(this.baseUrl + this.uid + '/notes.json').pipe(
      map((response) => {
        const notes = [];
        for (let key in response) {
          if (response.hasOwnProperty) {
            notes.push({ ...response[key], id: key });
          }
        }
        this.notes = notes;
        return this.notes;
      })
    );
  }

  updateNote(id, title, content) {
    const noteUrl = this.baseUrl + this.uid + '/notes/' + id + '.json';
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
    const noteUrl = this.baseUrl + this.uid + '/notes/' + id + '.json';
    return this.http.delete(noteUrl).subscribe((data) => {
      this.fetchPosts().subscribe((response) => {
        this.notes = response;
        this.$notesChanged.next(this.notes);
      });
    });
  }

  updateUserId() {
    this.auth.user.subscribe((user) => {
      if (user) {
        console.log('updating user');
        this.uid = user.id;
      }
    });
  }
}
