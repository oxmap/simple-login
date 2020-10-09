import { Component, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthService } from 'ng-gapi';
import GoogleUser = gapi.auth2.GoogleUser;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private user: GoogleUser = undefined;

  constructor(private googleAuthService: GoogleAuthService, private ngZone: NgZone, private router: Router) { }

  public signIn() {
    this.googleAuthService.getAuth().subscribe((auth) => {
        auth.signIn().then(res => this.signInSuccessHandler(res), err => this.signInErrorHandler(err));
    });
  }

  private signInSuccessHandler(res: GoogleUser) {
    this.ngZone.run(() => {
        this.user = res;
        console.log(res);
        this.router.navigate(['./about']);
    });
}

private signInErrorHandler(err) {
    console.warn(err);
}

}
