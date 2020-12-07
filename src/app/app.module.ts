import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NoteComponent } from './note/note.component';
import { NotesComponent } from './notes/notes.component';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { Resolver } from './resolver';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/notes',
  },
  {
    path: 'notes',
    component: NotesComponent,
    resolve: { notes: Resolver },
  },
];

@NgModule({
  declarations: [AppComponent, NoteComponent, NotesComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    DragDropModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [Resolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
