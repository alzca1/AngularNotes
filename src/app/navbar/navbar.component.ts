import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { LogFormComponent } from '../log-form/log-form.component';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild(MatMenuTrigger) signIn: MatMenuTrigger;
  isLoggedIn = false;
  userName: string = null;
  private userSub: Subscription;
  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe((user) => {
      this.isLoggedIn = !user ? false : true;
      if (user) {
        this.userName = user.email.split('@')[0];
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(LogFormComponent, {
      width: '300px',
      height: '300px',
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}
