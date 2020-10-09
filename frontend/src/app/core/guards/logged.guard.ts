import { Injectable } from '@angular/core';
import { Router, CanLoad, Route } from '@angular/router';
import { AboutState } from '@app/features/about/states/about.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanLoad {
  @Select(AboutState) user$: Observable<boolean>;
  constructor( private readonly router: Router) {}

  /**
   * Возможен ли переход по адресу
   * @return boolean
   */
  public canLoad(route: Route): boolean | Observable<boolean> {
    // @Select(AboutState) user$: Observable<any>;
    return this.user$.pipe(
      map((res) => {
        console.log(res);
        return res
      }));
    // .pipe(map(res) => {
    //   console.log(res)
    //   return res;
    // });


    // this.router.navigateByUrl(`/login`);
  //  return false;
    // const isLogin = route.path === APP_ROUTE.PATH.LOGIN;
    // if (this.settingsService.loggedIn) {
    //   if (isLogin) {
    //     this.router.navigateByUrl(`/${APP_ROUTE.PATH.SUGGESTIONS}`);
    //     return false;
    //   }
    //   return true;
    // } else {
    //   if (isLogin) {
    //     return true;
    //   }
    //   this.router.navigateByUrl(`/${APP_ROUTE.PATH.LOGIN}`);

    //   return false;
    // }
  }
}
