import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as SignupActions from './signup.actions';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class SignupEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthenticationService
  ) {}

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SignupActions.signup),
      mergeMap(action =>
        this.authService.signup(action.signupRequest).pipe(
          map(user => SignupActions.signupSuccess({ user })),
          catchError(error => of(SignupActions.signupFailure({ error })))
        )
      )
    )
  );
}
