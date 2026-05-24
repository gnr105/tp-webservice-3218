import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Audios } from '../models/audios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private apiUrl = 'https://open-ai-text-to-speech1.p.rapidapi.com/';
  
  // Reemplaza con tu Key exacta de RapidAPI que figura en tus capturas
  private apiKey = '361eb0c732msh3e2658b57e0af70p106057jsn7b2fbd1c858e'; 
  private apiHost = 'open-ai-text-to-speech1.p.rapidapi.com';

  constructor(private http: HttpClient) { }

  convertirTextoToAudio(requestData: Audios): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-rapidapi-key': this.apiKey,
      'x-rapidapi-host': this.apiHost
    });

    // Es CRUCIAL el responseType: 'blob' para recibir archivos binarios (mp3/wav)
    return this.http.post(this.apiUrl, requestData, { headers, responseType: 'blob' });
  }
}
