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
        this.router.navigate(['/notes']);
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  onSwitchLogMode() {
    this.isLoginMode = !this.isLoginMode;
    console.log('switching');
  }
}
