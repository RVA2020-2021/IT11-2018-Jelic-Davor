import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proizvod_URL } from '../app.constants';
import { Proizvod } from '../models/proizvod';

@Injectable({
  providedIn: 'root'
})
export class ProizvodService {

  constructor(private httpClient: HttpClient) { }

  public getAllProizvodi(): Observable<any>{
    return this.httpClient.get(`${Proizvod_URL}`);
  }

  public addProizvod(proizvod: Proizvod): Observable<any>{
    proizvod.id = 0;
    return this.httpClient.post(`${Proizvod_URL}`, proizvod);
  }

  public updateProizvod(proizvod: Proizvod): Observable<any>{
    return this.httpClient.put(`${Proizvod_URL}`, proizvod);
  }

  public deleteProizvod(id: number): Observable<any>{
    return this.httpClient.delete(`${Proizvod_URL}/${id}`);
  }
}
