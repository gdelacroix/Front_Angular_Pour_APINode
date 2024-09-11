import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl: string;

  constructor(private http: HttpClient, private constants: Constants) {
    this.apiUrl = `${this.constants.API_ENDPOINT}/products`;
  }

  // Méthode pour obtenir la liste des produits
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Méthode pour ajouter un nouveau produit
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, product);
  }
}
