import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Product } from '../../../shared/models/models/product'
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  private apiUrl = environment.fakeStoreApiUrl + 'products'

  constructor(private http: HttpClient) {}

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
  }
}
