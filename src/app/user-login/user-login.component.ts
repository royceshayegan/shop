import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(public auth: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  /// Social Login

  signInWithGoogle(): void {
    this.auth.googleLogin()
      .then(() => this.afterSignIn());
  }

emailLogin(email, password): void {
  this.auth.emailLogin(email, password)
  .then(() => this.afterSignIn())
  .catch((error) => console.log(error));
}

  /// Shared
  private afterSignIn(): void {
    // Do after login stuff here, such router redirects, toast messages, etc.
    this.router.navigate(['profile']);
  }

}
