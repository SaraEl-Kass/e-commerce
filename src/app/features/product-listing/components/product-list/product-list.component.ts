import { Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable, BehaviorSubject } from 'rxjs'
import { loadProductsSuccess } from '../../product-state/product.actions'
import { Product } from '../../../../shared/models/models/product'
import { selectAllProducts } from '../../product-state/product.selectors'
import { ProductOperationsService } from '../../../services/product-operations.service'
import { ProductListingService } from '../../services/product-listing.service'
import { SearchService } from '../../../../shared/services/search.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>
  filteredProducts$: Observable<Product[]>
  categories$: Observable<string[]> // Define categories$ observable
  private allProducts: Product[] = []
  private filteredProductsSubject = new BehaviorSubject<Product[]>([])
  currentFilter: string = 'All' // Keep track of the current filter
  currentSort: string = '' // Keep track of the current sort

  constructor(
    private store: Store,
    private productOperationsService: ProductOperationsService,
    private productListingService: ProductListingService,
    private searchService: SearchService
  ) {
    this.products$ = this.store.pipe(select(selectAllProducts))
    this.filteredProducts$ = this.filteredProductsSubject.asObservable()
    this.categories$ = this.productOperationsService.getCategories() // Fetch categories
  }

  ngOnInit(): void {
    this.productListingService.getProducts().subscribe((result: Product[]) => {
      this.store.dispatch(loadProductsSuccess({ products: result }))
    })

    this.products$.subscribe((products) => {
      this.allProducts = products
      this.applyFiltersAndSort() // Apply any current filters and sorting
    })

    this.searchService.search$.subscribe((searchTerm) => {
      this.onSearch(searchTerm)
    })
  }

  onSearch(searchTerm: string): void {
    const filteredProducts =
      this.productOperationsService.filterProductsBySearchTerm(
        this.allProducts,
        searchTerm
      )
    this.filteredProductsSubject.next(filteredProducts)
  }

  onFilterCategory(category: string): void {
    this.currentFilter = category
    this.applyFiltersAndSort()
  }

  onSort(order: string): void {
    this.currentSort = order
    this.applyFiltersAndSort()
  }

  applyFiltersAndSort(): void {
    let products = this.allProducts

    if (this.currentFilter && this.currentFilter !== 'All') {
      products = this.productOperationsService.filterProductsByCategory(
        products,
        this.currentFilter
      )
    }

    if (this.currentSort) {
      products = this.productOperationsService.sortProducts(
        products,
        this.currentSort
      )
    }

    this.filteredProductsSubject.next(products)
  }

  trackByProductId(index: number, product: Product): number {
    return product.id
  }
}
