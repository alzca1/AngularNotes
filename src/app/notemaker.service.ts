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
  private wereOrdered = false;
  public orderMode: string = 'first_created';
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
        console.log(response);
        const notes = [];
        for (let key in response) {
          if (response.hasOwnProperty) {
            notes.push({ ...response[key], id: key });
            console.log(notes);
          }
        }
        switch (this.orderMode) {
          case 'last_edited':
            console.log('case last_edited');
            this.notes = notes.sort((a, b) => {
              let aDate = new Date(a.date);
              let bDate = new Date(b.date);
              return bDate.getTime() - aDate.getTime();
            });
            break;
          case 'last_created':
            console.log('case last_created');
            this.notes = notes.sort((a, b) => {
              let aDate = new Date(a.creationDate);
              let bDate = new Date(b.creationDate);
              return bDate.getTime() - aDate.getTime();
            });
            break;
          case 'first_created':
            console.log('case first_created');
            this.notes = notes;
            break;
          default:
            console.log('case default');
            this.notes = notes;
            break;
        }

        // this.notes = notes
        //   .sort((a, b) => {
        //     let aDate = new Date(a.creationDate);
        //     let bDate = new Date(b.creationDate);
        //     return bDate.getTime() - aDate.getTime();
        //   })
        console.log(this.notes);
        this.$notesChanged.next(this.notes);
        return this.notes;
      })
    );
  }

  updateNote(id, title, content) {
    const noteUrl = this.baseUrl + this.uid + '/notes/' + id + '.json';
    const newTitle = title.nativeElement.innerText;
    const newContent = content.nativeElement.innerText;
    const newDate = new Date();
    // const updatedNotes = this.notes.slice();
    this.http
      .patch(noteUrl, {
        title: newTitle,
        content: newContent,
        date: newDate,
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

  updateColor(id, color) {
    const noteUrl = this.baseUrl + this.uid + '/notes/' + id + '.json';
    const newDate = new Date();
    this.http
      .patch(noteUrl, {
        color: color,
        date: newDate,
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  updatePosition(id, coordinates) {
    const noteUrl = this.baseUrl + this.uid + '/notes/' + id + '.json';
    this.http
      .patch(noteUrl, {
        lastDragPosition: coordinates,
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  updateFetchPosts() {
    this.fetchPosts().subscribe((response) => {
      console.log('response');
    });
  }
}
