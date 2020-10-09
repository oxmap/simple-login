import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { environment } from '@env';
import { MaterialModule } from '@shared/material.module';
import { SettingsState } from './states/settings.state';
import {
  GoogleApiModule,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
} from 'ng-gapi';
import { HttpClientModule } from '@angular/common/http';

const gapiClientConfig: NgGapiClientConfig = {
  client_id: '699411377971-k5ds1ri6vslb2cf628nhvutjpk2j7elq.apps.googleusercontent.com',
  discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
  ux_mode: 'popup',
  scope: [
      'https://www.googleapis.com/auth/userinfo.profile'
  ].join(' ')
};

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    NgxsModule.forRoot([
      SettingsState
    ],
      { developmentMode: !environment.production }
    ),
    NgxsFormPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot()
  ],
})
export class CoreModule { }
