import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from './login.reducer';

export const selectLoginState = createFeatureSelector<LoginState>('login');

export const selectLoginResponse = createSelector(
  selectLoginState,
  (state: LoginState) => state.loginResponse
);

export const selectLoginLoading = createSelector(
  selectLoginState,
  (state: LoginState) => state.loading
);

export const selectLoginError = createSelector(
  selectLoginState,
  (state: LoginState) => state.error
);

export const selectLoginUsername = createSelector(
  selectLoginState,
  (state: LoginState) => state.username
);

