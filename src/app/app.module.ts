import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';

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
import { NavbarComponent } from './navbar/navbar.component';
import { LogFormComponent } from './log-form/log-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

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
  declarations: [
    AppComponent,
    NoteComponent,
    NotesComponent,
    NavbarComponent,
    LogFormComponent,
  ],
  entryComponents: [LogFormComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    DragDropModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
  ],
  providers: [
    Resolver,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
    { provide: MatDialogRef, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
