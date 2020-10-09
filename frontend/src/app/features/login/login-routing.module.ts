
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
// import { HomeAuthResolver } from './login-auth-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    // resolve: {
    //   isAuthenticated: HomeAuthResolver
    // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
