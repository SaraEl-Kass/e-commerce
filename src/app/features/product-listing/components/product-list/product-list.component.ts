import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, BehaviorSubject } from 'rxjs';
import { loadProducts } from '../../product-state/product.actions';
import { Product } from '../../models/product';
import { selectAllProducts } from '../../product-state/product.selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  filteredProducts$: Observable<Product[]>;
  private allProducts: Product[] = [];
  private filteredProductsSubject = new BehaviorSubject<Product[]>([]);

  constructor(private store: Store) {
    this.products$ = this.store.pipe(select(selectAllProducts));
    this.filteredProducts$ = this.filteredProductsSubject.asObservable();
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
    this.products$.subscribe(products => {
      this.allProducts = products;
      this.filteredProductsSubject.next(products);
    });
  }

  onSearch(searchTerm: string): void {
    const filteredProducts = this.allProducts.filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.filteredProductsSubject.next(filteredProducts);
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
