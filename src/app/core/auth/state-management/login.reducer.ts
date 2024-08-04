import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure } from './login.actions';
import { LoginResponse } from '../models/login-response';

export interface LoginState {
  loginResponse: LoginResponse | null;
  error: string | null;
  loading: boolean;
}

export const initialState: LoginState = {
  loginResponse: null,
  error: null,
  loading: false
};

export const loginReducer = createReducer(
  initialState,
  on(login, state => ({ ...state, loading: true })),
  on(loginSuccess, (state, { loginResponse }) => ({
    ...state,
    loginResponse,
    loading: false,
    error: null
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);

