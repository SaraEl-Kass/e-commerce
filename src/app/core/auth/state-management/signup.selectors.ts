import { createFeatureSelector, createSelector } from '@ngrx/store'
import { SignupState } from './signup.reducer'

export const selectSignupState = createFeatureSelector<SignupState>('signup')

export const selectUser = createSelector(
  selectSignupState,
  (state: SignupState) => state.user
)

export const selectSignupError = createSelector(
  selectSignupState,
  (state: SignupState) => state.error
)

export const selectSignupLoading = createSelector(
  selectSignupState,
  (state: SignupState) => state.loading
)
