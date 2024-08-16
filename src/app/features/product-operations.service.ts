import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FilterService } from '../shared/services/filter.service';
import { SortService } from './product-listing/services/sort.service';
import { Product } from '../shared/models/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductOperationsService {

  constructor(private filterService: FilterService, private sortService: SortService) {}

  filterProductsBySearchTerm(products: Product[], searchTerm: string): Product[] {
    return products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  filterProductsByCategory(products: Product[], category: string): Product[] {
    if (category === 'All') {
      return products;
    }
    return products.filter(product => product.category === category);
  }
  
  sortProducts(products: Product[], order: string): Product[] {
    return products.slice().sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }

  getCategories(): Observable<string[]> {
    return this.filterService.getCategories();
  }
}