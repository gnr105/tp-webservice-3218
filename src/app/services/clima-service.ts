import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { ClimaData } from '../models/clima-data';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  private apiClimaUrl = 'https://weather-api167.p.rapidapi.com/forecast%20weather';

  private apiKey = '361eb0c732msh3e2658b57e0af70p106057jsn7b2fbd1c858e'; // Tu Key
  private apiHost = 'weather-api167.p.rapidapi.com'; // El host correcto de tu captura

  private historial: ClimaData[] = [];

  constructor(private http: HttpClient) { }

  getClima(localidad: string): Observable<ClimaData> {
    const headers = new HttpHeaders({
      'x-rapidapi-key': this.apiKey,
      'x-rapidapi-host': this.apiHost
    });

    // Según tu captura, esta API usa el parámetro 'place' en lugar de 'q'
    const params = new HttpParams().set('place', `${localidad},AR`);

    return this.http.get<any>(this.apiClimaUrl, { headers, params }).pipe(
      map(res => {
        // Accedemos al primer elemento de la lista del pronóstico
        const datosPrincipales = res.list[0].main;
        
        const tempCelsius = Math.round(datosPrincipales.temp - 273.15);
        const sensacionCelsius = Math.round(datosPrincipales.feels_like - 273.15);

        const clima: ClimaData = {
          localidad: localidad, // Usamos la ingresada por el usuario
          provincia: 'Jujuy',
          pais: 'Argentina',
          temperatura: tempCelsius,
          sensacionTermica: sensacionCelsius,
          condicionTexto: res.list[0].weather[0]?.description || 'Despejado',
          // Usamos un icono por defecto lindo de clima ya que esta API devuelve texto largo
          condicionIcono: 'https://cdn-icons-png.flaticon.com/512/869/869869.png', 
          humedad: datosPrincipales.humidity,
          viento: res.list[0].wind?.speed || 1.6,
          fechaConsulta: new Date()
        };
        return clima;
      }),
      tap(clima => {
        // Agregamos al historial evitando duplicados de la misma ciudad
        this.historial = [clima, ...this.historial.filter(h => h.localidad !== clima.localidad)].slice(0, 5);
      })
    );
  }

  getHistorial(): ClimaData[] {
    return this.historial;
  }
}