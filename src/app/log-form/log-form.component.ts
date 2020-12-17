import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthResponseData } from '../auth.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import {
  MatFormField,
  MatFormFieldControl,
} from '@angular/material/form-field';

import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NotemakerService } from '../notemaker.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.scss'],
})
export class LogFormComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  wrongMail = false;
  wrongMailMessage: string;
  wrongPassword = false;
  wrongPasswordMessage: string;
  constructor(
    public dialogRef: MatDialogRef<LogFormComponent>,
    private auth: AuthService,
    private router: Router,
    private noteMaker: NotemakerService
  ) {}

  signInForm: FormGroup;
  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
    });
  }

  onSubmit() {
    this.wrongMail = false;
    this.wrongPassword = false;
    this.wrongMailMessage = null;
    this.wrongPasswordMessage = null;
    this.isLoading = true;
    const { email, password } = this.signInForm.value;
    let authObs: Observable<AuthResponseData>;
    if (!this.isLoginMode) {
      authObs = this.auth.signUp(email, password);
    } else {
      authObs = this.auth.signIn(email, password);
    }

    authObs.subscribe(
      (data) => {
        this.isLoading = false;
        console.log('redirecting');
        this.dialogRef.close();
        this.router.navigate(['/notes']);
      },
      (error) => {
        const errorMessage = error.error.error.message;
        console.log(errorMessage);
        this.errorHandling(errorMessage);
        this.isLoading = false;
      }
    );
  }

  onSwitchLogMode() {
    this.isLoginMode = !this.isLoginMode;
    console.log('switching');
  }

  errorHandling(error) {
    console.log('errorHandling');
    switch (error) {
      case 'EMAIL_NOT_FOUND':
        this.wrongMailMessage = 'E-mail not found!';
        this.wrongMail = true;
        break;
      case 'INVALID_PASSWORD':
        console.log('error invalid password');
        this.wrongPasswordMessage = 'Invalid password!';
        this.wrongPassword = true;
        break;
      case 'INVALID_EMAIL':
        console.log('error invalid email');
        this.wrongMailMessage = 'Invalid e-mail!';
        this.wrongMail = true;
        break;

      case 'MISSING_PASSWORD':
        this.wrongPasswordMessage = 'Missing password!';
        this.wrongPassword = true;
        break;

      case 'MISSING_EMAIL':
        this.wrongMailMessage = 'Missing e-mail!';
        this.wrongMail = true;
        break;
      case 'EMAIL_EXISTS':
        this.wrongMailMessage = 'E-mail already registered!';
        this.wrongMail = true;
        break;
    }
  }
  resetErrors() {
    this.wrongMail = false;
    this.wrongPassword = false;
  }
}
