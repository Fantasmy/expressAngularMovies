import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  
  feedbackEnabled = false;
  error = null;
  processing = false;
  username: String;
  password: String;  

  constructor(private router: Router, private authService: AuthService  ) { }

  ngOnInit() {
  }

  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.processing = true;
      const user = {
        username: this.username,
        password: this.password
      }

      this.authService.login(user)
        .then((result) => {
          this.router.navigate(['/']);
      })
        .catch((err) => {
          this.error = err.error.code; // code the backend respond with
          this.processing = false;
          this.feedbackEnabled = false;
        });
    }
  }
}
