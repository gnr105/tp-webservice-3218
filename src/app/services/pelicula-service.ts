import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Peliculas } from '../models/peliculas';

@Injectable({
  providedIn: 'root',
})
export class PeliculaService {
  constructor(private http: HttpClient){
    
  }
  getPeliculas(): Observable<Peliculas[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'x-rapidapi-key': '361eb0c732msh3e2658b57e0af70p106057jsn7b2fbd1c858e',
        'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com' 

      })
    };
    return this.http.get<Peliculas[]>(`https://imdb-top-100-movies.p.rapidapi.com/`, httpOptions);
  }
}
