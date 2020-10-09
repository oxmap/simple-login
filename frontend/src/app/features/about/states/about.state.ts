import { Injectable } from '@angular/core';
import { Action, Selector, State } from '@ngxs/store';

export class User {
  static readonly type = '[User] Add';
  constructor(public name: string, public givenName: string, public familyName: string, public imageUrl: string, public email: string) {}
}

export interface AboutStateModel {
  user: any;
}

@State<AboutStateModel>({
  name: 'about'
})
@Injectable()
export class AboutState {

  constructor() {}

  @Selector()
  public getUser(state: AboutStateModel) {
    return state.user;
  }

  @Action(User)
  setUser({ getState, setState }, { name, givenName, familyName, imageUrl, email }: User) {
    const state = getState();
    setState({
      ...state,
      name,
      givenName,
      familyName,
      imageUrl,
      email
  });
  }
}
