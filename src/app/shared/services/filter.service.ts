import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/models/product';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  // Get all categories
  getCategories(): Observable<string[]> {
    console.log('helloo');
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  // Get products by category
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`);
  }
}
