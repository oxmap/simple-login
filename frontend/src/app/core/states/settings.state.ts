import { State, Action, Selector, StateContext } from '@ngxs/store';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';

export interface SettingsStateModel {
  selectedTheme: string;
}

@State<SettingsStateModel>({
  name: 'settings',
  defaults: {
    selectedTheme: 'hello world'
  }
})
@Injectable()
export class SettingsState {
    constructor(private overlayContainer: OverlayContainer) {}

    @Selector()
    public static getState(state: SettingsStateModel) {
        return state;
    }

    @Selector()
    public static getEffectiveTheme(state: SettingsStateModel) {
      return state.selectedTheme;
    }
}
