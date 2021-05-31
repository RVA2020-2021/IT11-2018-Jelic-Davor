import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StavkaRacuna_URL, StavkeZaRacun_URL } from '../app.constants';
import { StavkaRacuna } from '../models/stavka_racuna';

@Injectable({
  providedIn: 'root'
})
export class StavkaRacunaService {

  constructor(private httpClient: HttpClient) { }

  public getStavkeZaRacun(idRacuna: number): Observable<any> {
    return this.httpClient.get(`${StavkeZaRacun_URL}/${idRacuna}`);
  }

  public addStavkaRacuna(stavkaRacuna: StavkaRacuna): Observable<any> {
    stavkaRacuna.id = 0;
    return this.httpClient.post(`${StavkaRacuna_URL}`, stavkaRacuna);
  }

  public updateStavkaRacuna(stavkaRacuna: StavkaRacuna): Observable<any> {
    return this.httpClient.put(`${StavkaRacuna_URL}`, stavkaRacuna);
  }

  public deleteStavkaRacuna(id: number): Observable<any> {
    return this.httpClient.delete(`${StavkaRacuna_URL}/${id}`);
  }
}
