import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-order-confirmation-dialog',
  templateUrl: './order-confirmation-dialog.component.html',
  styleUrls: ['./order-confirmation-dialog.component.scss'],
})
export class OrderConfirmationDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<OrderConfirmationDialogComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close()
  }
}
