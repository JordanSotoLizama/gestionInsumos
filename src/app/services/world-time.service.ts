import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorldTimeService {

 private apiUrl = 'https://worldtimeapi.org/api/timezone/America/Santiago';

  constructor(private http: HttpClient) { }

  getWeekNumber(): Observable<number> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(data => data.week_number)
    );
  }
}