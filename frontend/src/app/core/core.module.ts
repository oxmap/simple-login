import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { environment } from '@env';
import { MaterialModule } from '@shared/material.module';
import { AuthModule } from './auth/auth.module';
import { SettingsState } from './states/settings.state';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    AuthModule,
    NgxsModule.forRoot([
      SettingsState
    ],
      { developmentMode: !environment.production }
    ),
    NgxsFormPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot()
  ],
})
export class CoreModule { }
