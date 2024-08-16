import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/models/models/product';

@Injectable({
  providedIn: 'root'
})
export class SortService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  sortProducts(order: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?sort=${order}`);
  }
}

