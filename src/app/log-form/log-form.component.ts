import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  MatFormField,
  MatFormFieldControl,
} from '@angular/material/form-field';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.scss'],
})
export class LogFormComponent implements OnInit {
  isLoginMode = true;
  constructor(public dialogRef: MatDialogRef<LogFormComponent>) {}

  signInForm: FormGroup;
  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
    });
  }

  onSubmit() {
    console.log(this.signInForm.value);
  }
  onSwitchLogMode() {
    this.isLoginMode = !this.isLoginMode;
    console.log('switching');
  }
}
