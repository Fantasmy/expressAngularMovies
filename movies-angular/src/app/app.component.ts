import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';  // = -> assignment
  loading = true;
  anon: boolean; // : -> typescript declaration
  user: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.userChange$.subscribe((user) => { // userChange$ = Observable
      this.loading = false; // variables so the template can react
      this.user = user; // variables so the template can react
      this.anon = !user; // variables so the template can react
    });
  }

  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/']));
  }
}
