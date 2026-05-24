import { Component } from '@angular/core';
import { Audios } from '../../../models/audios';
import { AudioService } from '../../../services/audio-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-audio',
  imports: [CommonModule, FormsModule],
  templateUrl: './audio.html',
  styleUrl: './audio.css',
})
export class Audio {
  textoUsuario: string = '';
  vozSeleccionada: string = 'alloy';
  tonoInstruccion: string = 'Speak in a lively and optimistic tone.';
  
  // Variables de control
  audioUrl: string | null = null;
  cargando: boolean = false;
  errorMensaje: string | null = null;

  constructor(private audioService: AudioService) {}

  generarAudio(): void {
    if (!this.textoUsuario.trim()) {
      this.errorMensaje = 'Por favor, ingresa un texto para convertir.';
      return;
    }

    this.cargando = true;
    this.errorMensaje = null;
    this.audioUrl = null;

    const payload: Audios = {
      model: 'tts-1',
      input: this.textoUsuario,
      voice: this.vozSeleccionada,
      instructions: this.tonoInstruccion
    };

    this.audioService.convertirTextoToAudio(payload).subscribe({
      next: (blobData: Blob) => {
        // Creamos una URL local mapeada al objeto binario recibido
        this.audioUrl = URL.createObjectURL(blobData);
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al generar el audio:', err);
        this.errorMensaje = 'Hubo un problema al conectar con la API de Audio.';
        this.cargando = false;
      }
    });
  }
}
