import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NgoService {

  private apiUrl = `${environment.apiUrl}/ngos`;

  constructor(private http: HttpClient) {}

  getNGOs(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getNGOById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createNGO(ngo: any): Observable<any> {
    return this.http.post(this.apiUrl, ngo);
  }

  updateNGO(id: number, ngo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, ngo);
  }

  deleteNGO(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}