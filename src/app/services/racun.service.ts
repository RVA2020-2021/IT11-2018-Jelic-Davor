import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Racun_URL } from '../app.constants';
import { Racun } from '../models/racun';

@Injectable({
  providedIn: 'root'
})
export class RacunService {

  constructor(private httpClient: HttpClient) { }

  public getAllRacuni(): Observable<any> {
    return this.httpClient.get(`${Racun_URL}`);
  }

  public addRacun(racun: Racun): Observable<any> {
    racun.id = 0;
    return this.httpClient.post(`${Racun_URL}`, racun);
  }

  public updateRacun(racun: Racun): Observable<any> {
    return this.httpClient.put(`${Racun_URL}`, racun);
  }

  public deleteRacun(id: number): Observable<any> {
    return this.httpClient.delete(`${Racun_URL}/${id}`);
  }
}
