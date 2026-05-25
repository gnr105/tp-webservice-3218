import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Auto } from '../models/auto';
import { Modelos } from '../models/modelos';

@Injectable({
  providedIn: 'root',
})
export class MarcaService {
  private baseUrl = 'https://car-specs.p.rapidapi.com/v2/cars';
  private apiKey = '361eb0c732msh3e2658b57e0af70p106057jsn7b2fbd1c858e';
  private apiHost = 'car-specs.p.rapidapi.com';

  // Almacén local para evitar llamadas duplicadas a la API y cuidar el plan gratuito
  private cacheModelos: Map<string, Modelos[]> = new Map();

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-rapidapi-key': this.apiKey,
      'x-rapidapi-host': this.apiHost
    });
  }

  // 1. Obtener todas las marcas
  getMarcas(): Observable<Auto[]> {
    return this.http.get<Auto[]>(`${this.baseUrl}/makes`, { headers: this.getHeaders() });
  }

  // 2. Obtener modelos por ID de Marca (Con verificación de Caché)
  getModelosPorMarca(makeId: any): Observable<Modelos[]> {
    const id = makeId.toString();
    // Si ya consultamos esta marca antes, devolvemos los datos guardados inmediatamente
    if (this.cacheModelos.has(id)) {
      return of(this.cacheModelos.get(id)!);
    }
    // Si no está en caché, va a buscar a la API y lo guarda antes de responder
    return this.http.get<Modelos[]>(`${this.baseUrl}/makes/${id}/models`, { headers: this.getHeaders() }).pipe(
      tap(modelos => {
        this.cacheModelos.set(id, modelos);
        console.log(`Guardados en caché ${modelos.length} modelos para la marca ID: ${id}`);
      })
    );
  }
}
