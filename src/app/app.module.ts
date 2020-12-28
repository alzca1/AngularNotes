import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  MatButtonToggle,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';

import { AppComponent } from './app.component';
import { NoteComponent } from './note/note.component';
import { NotesComponent } from './notes/notes.component';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { Resolver } from './resolver';
import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LogFormComponent } from './log-form/log-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { HomeComponent } from './home/home.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { SearchBarComponent } from './search-bar/search-bar.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },

  {
    path: 'home',
    component: HomeComponent,
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
    HomeComponent,
    SearchBarComponent,
  ],
  entryComponents: [LogFormComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    DragDropModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
  ],
  providers: [
    Resolver,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
    { provide: MatDialogRef, useValue: {} },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
