import { TestBed } from '@angular/core/testing'

import { ProductOperationsService } from './product-operations.service'

describe('ProductOperationsService', () => {
  let service: ProductOperationsService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ProductOperationsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
