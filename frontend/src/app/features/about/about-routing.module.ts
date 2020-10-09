import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedGuard } from '@app/core/guards/logged.guard';

import { AboutComponent } from './about.component';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [LoggedGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
