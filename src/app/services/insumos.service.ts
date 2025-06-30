import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {

  private apiUrl = 'http://localhost:3000/insumos';

  constructor(private http: HttpClient) {}

  obtenerInsumos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}