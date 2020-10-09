import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

export interface AboutStateModel {
  newAboutForm: any;
}

@State<AboutStateModel>({
  name: 'about',
  defaults: {
    newAboutForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
    }
  }
})
@Injectable()
export class AboutState {

  constructor() {}
}
