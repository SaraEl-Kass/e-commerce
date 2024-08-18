import { createReducer, on } from '@ngrx/store'
import { SignupActions } from './signup.actions'

export const initialState: ReadonlyArray<string> = []

export const collectionReducer = createReducer(
  initialState,
  on(SignupActions.removeAccount, (state, { Email }) =>
    state.filter((id) => id !== Email)
  ),
  on(SignupActions.addAccount, (state, { Email }) => {
    if (state.indexOf(Email) > -1) return state

    return [...state, Email]
  })
)
