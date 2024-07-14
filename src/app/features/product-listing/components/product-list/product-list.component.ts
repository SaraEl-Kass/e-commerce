import { Component, OnInit } from '@angular/core';
import { ProductListingService } from '../../services/product-listing.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productListingService: ProductListingService) {}

  ngOnInit(): void {
    this.productListingService.getProducts().subscribe(data => {
      console.log(data); //for checking
      this.products = data;
    });
  }
}
