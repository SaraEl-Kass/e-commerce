import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Product } from '../../../shared/models/models/product'

@Injectable({
  providedIn: 'root',
})
export class ProductListingService {
  private apiUrl = 'https://fakestoreapi.com/products'

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl)
  }

  // // Get all categories
  // getCategories(): Observable<string[]> {
  //   console.log('helloo');
  //   return this.http.get<string[]>(`${this.apiUrl}/categories`);
  // }

  // // Get products by category
  // getProductsByCategory(category: string): Observable<Product[]> {
  //   return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`);
  // }
}
