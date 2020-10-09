import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { SharedModule } from '@shared/shared.module';

import { AboutState } from './states/about.state';
import { NgxsModule } from '@ngxs/store';


@NgModule({
  declarations: [
    AboutComponent,
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    SharedModule,
    NgxsModule.forFeature([AboutState])
  ]
})
export class AboutModule { }
