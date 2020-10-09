import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AboutState, User } from '@app/features/about/states/about.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate {
  @Select(AboutState) user$: Observable<User>;
  constructor( private readonly router: Router) {}

  public canActivate(next: ActivatedRouteSnapshot): boolean | Observable<boolean> {
    return this.user$.pipe(
      map((user) => {
        const res = !!user.name && !!user.email && !!user.imageUrl;
        if (!res) {
          this.router.navigate(['/login']);
        }

        return true;
      }))
  }
}
