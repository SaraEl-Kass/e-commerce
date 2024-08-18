import { createAction, props } from '@ngrx/store'
import { SignupRequest } from '../models/signup-request'

export const signup = createAction(
  '[Signup] Signup',
  props<{ signupRequest: SignupRequest }>()
)

export const signupSuccess = createAction(
  '[Signup] Signup Success',
  props<{ user: any }>()
)

export const signupFailure = createAction(
  '[Signup] Signup Failure',
  props<{ error: any }>()
)
