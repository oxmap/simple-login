import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { HomeRoutingModule } from './login-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class LoginModule { }
