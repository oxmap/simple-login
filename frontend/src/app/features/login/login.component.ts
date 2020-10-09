import { Component, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { GoogleAuthService } from 'ng-gapi';
import { User } from '../about/states/about.state';
import GoogleUser = gapi.auth2.GoogleUser;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  constructor(private store: Store, private googleAuthService: GoogleAuthService, private ngZone: NgZone, private router: Router) { }

  public signIn() {
    this.googleAuthService.getAuth().subscribe((auth) => {
        auth.signIn().then(res => this.signInSuccessHandler(res), err => this.signInErrorHandler(err));
    });
  }

  private signInSuccessHandler(res: GoogleUser) {
    this.ngZone.run(() => {
        console.log(res);
        const profile = res.getBasicProfile();
        this.store.dispatch(new User(profile.getName(), profile.getGivenName(), profile.getFamilyName(), profile.getImageUrl(), profile.getEmail()));
        this.router.navigate(['./about']);
    });
  }

  private signInErrorHandler(err) {
      console.warn(err);
  }

}
