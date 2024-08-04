import { Component } from '@angular/core';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ButtonRendererComponent } from '../button-renderer/button-renderer.component';

@Component({
  selector: 'app-my-grid',
  templateUrl: './my-grid.component.html',
  styleUrls: ['./my-grid.component.scss']
})
export class MyGridComponent {
  columnDefs: ColDef[] = [
    { headerName: 'Make', field: 'make', sortable: true, filter: true },
    { headerName: 'Model', field: 'model', sortable: true, filter: true, editable: true },
    { headerName: 'Price', field: 'price', sortable: true, filter: true, valueFormatter: this.currencyFormatter },
    { headerName: 'Availability', field: 'availability', cellRenderer: this.availabilityRenderer },
    { headerName: 'Description', field: 'description', editable: true },
    {
      headerName: 'Actions',
      cellRenderer: ButtonRendererComponent,
      filter: false
    }
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000, availability: true, description: 'A reliable car' },
    { make: 'Ford', model: 'Mondeo', price: 32000, availability: false, description: 'A comfortable car' },
    { make: 'Porsche', model: 'Boxster', price: 72000, availability: true, description: 'A fast car' }
  ];

  gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 10
  };

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
  }

  currencyFormatter(params: any) {
    return `$${params.value}`;
  }

  availabilityRenderer(params: any) {
    return params.value ? '<span class="chip available">Available</span>' : '<span class="chip unavailable">Out of Stock</span>';
  }

  onDeleteRow(params: any) {
    const rowIndex = params.node.rowIndex;
    this.rowData.splice(rowIndex, 1);
    params.api.setRowData(this.rowData);
  }
}
