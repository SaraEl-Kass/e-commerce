import { Component } from '@angular/core'
import { ICellRendererParams } from 'ag-grid-community'
import { ICellRendererAngularComp } from 'ag-grid-angular'
@Component({
  selector: 'app-button-renderer',
  template: `
    <button (click)="onDelete()" class="btn btn-danger">
      <!-- <i class="fas fa-trash-alt"></i> -->
      Delete
    </button>
  `,
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
  params!: ICellRendererParams

  agInit(params: ICellRendererParams): void {
    this.params = params
  }

  refresh(params: ICellRendererParams): boolean {
    return false
  }

  onDelete() {
    if (this.params && this.params.data) {
      this.params.api.applyTransaction({ remove: [this.params.data] })
    }
  }
}
