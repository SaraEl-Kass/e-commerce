import { createAction, props } from '@ngrx/store'
import { LoginRequest } from '../models/login-request'
import { LoginResponse } from '../models/login-response'

export const login = createAction(
  '[Login] Login',
  props<{ loginRequest: LoginRequest }>()
)

export const loginSuccess = createAction(
  '[Login] Login Success',
  props<{ loginResponse: LoginResponse; username: string }>()
)

export const loginFailure = createAction(
  '[Login] Login Failure',
  props<{ error: any }>()
)
