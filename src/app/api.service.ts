import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = 'http://localhost:3011';

  constructor(private http: HttpClient) { }

  getCryptos(page: number, limit: number, search: string, sortBy: string) {
    return this.http.get(`${this.apiUrl}/cryptos?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}`);
  }

  getCryptoDetails(id: string) {
    return this.http.get(`${this.apiUrl}/crypto/${id}`);
  }

  getHistory(pair: string, interval: string) {
    return this.http.get(`${this.apiUrl}/history?pair=${pair}&interval=${interval}`);
  }
}
