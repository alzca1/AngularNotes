import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Note } from './note.class';
import { NotemakerService } from './notemaker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'notesAppContentEditable';
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.autologin();
  }
}
