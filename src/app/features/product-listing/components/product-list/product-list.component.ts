import { Component, OnInit } from '@angular/core';
import { ProductListingService } from '../../services/product-listing.service';
import { Product } from '../../models/product';
import { BehaviorSubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  private searchSubject = new BehaviorSubject<string>('');

  constructor(private productListingService: ProductListingService) {}

  ngOnInit(): void {
    this.productListingService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    });

    this.searchSubject.pipe(
      switchMap(searchTerm => this.productListingService.getProducts().pipe(
        map(products => products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase())))
      ))
    ).subscribe(filteredProducts => {
      this.filteredProducts = filteredProducts;
    });
  }

  onSearch(searchTerm: string): void {
    this.searchSubject.next(searchTerm);
  }
}
