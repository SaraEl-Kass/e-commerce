import { createReducer, on } from '@ngrx/store'
import { signup, signupSuccess, signupFailure } from './signup.actions'
import { SignupRequest } from '../models/signup-request'

export interface SignupState {
  user: SignupRequest | null
  loading: boolean
  error: any
}

export const initialState: SignupState = {
  user: null,
  loading: false,
  error: null,
}

export const signupReducer = createReducer(
  initialState,
  on(signup, (state) => ({ ...state, loading: true, error: null })),
  on(signupSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(signupFailure, (state, { error }) => ({ ...state, error, loading: false }))
)
