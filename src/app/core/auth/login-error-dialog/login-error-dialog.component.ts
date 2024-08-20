import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-login-error-dialog',
  templateUrl: './login-error-dialog.component.html',
  styleUrls: ['./login-error-dialog.component.scss'],
})
export class LoginErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LoginErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  closeDialog(): void {
    this.dialogRef.close()
  }
}
