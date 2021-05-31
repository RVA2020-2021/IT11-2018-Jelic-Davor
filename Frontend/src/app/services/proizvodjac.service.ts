import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proizvodjac_URL } from '../app.constants';
import { Proizvodjac } from '../models/proizvodjac';

@Injectable({
  providedIn: 'root'
})
export class ProizvodjacService {

  constructor(private httpClient: HttpClient) { }

  public getAllProizvodjaci(): Observable<any> {
    return this.httpClient.get(`${Proizvodjac_URL}`);
  }

  public addProizvodjac(proizvodjac: Proizvodjac): Observable<any> {
    proizvodjac.id=0;
    return this.httpClient.post(`${Proizvodjac_URL}`, proizvodjac);
  }

  public updateProizvodjac(proizvodjac: Proizvodjac): Observable<any> {
    return this.httpClient.post(`${Proizvodjac_URL}`, proizvodjac);
  }

  public deleteProizvodjac(id: number): Observable<any> {
    return this.httpClient.delete(`${Proizvodjac_URL}/${id}`);
  }
}
