import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProductDetailsService } from '../../services/product-details.service';
import { Product } from '../../../../shared/models/models/product';
import { BehaviorSubject } from 'rxjs';
import { AppShellModule } from '../../../../core/app-shell/app-shell.module';
import { FilterService } from '../../../../shared/services/filter.service';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, AppShellModule, SharedModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product$ = new BehaviorSubject<Product | undefined>(undefined);
  similarProducts$ = new BehaviorSubject<Product[]>([]);

  route = inject(ActivatedRoute);
  productDetailsService = inject(ProductDetailsService);
  filterService = inject(FilterService);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => { 
      const productId = params.get('id');
      if (productId) {
        this.productDetailsService
          .getProductById(+productId)
          .subscribe((product) => {
            this.product$.next(product);
            if (product) {
              this.filterService.getProductsByCategory(product.category).subscribe((similarProducts) => {
                this.similarProducts$.next(similarProducts);
              });
            }
          });
      }
    });
  }
}
