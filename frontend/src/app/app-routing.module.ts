import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'about',
    loadChildren: () =>
      import('@app/features/about/about.module').then(m => m.AboutModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@app/features/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
   imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
