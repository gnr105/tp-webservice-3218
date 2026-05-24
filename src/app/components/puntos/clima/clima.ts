import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClimaData } from '../../../models/clima-data';
import { ClimaService } from '../../../services/clima-service';

@Component({
  selector: 'app-clima',
  imports: [CommonModule, FormsModule],
  templateUrl: './clima.html',
  styleUrl: './clima.css',
})
export class Clima {
  ciudadBusqueda: string = 'San Salvador de Jujuy';
  climaActual: ClimaData | null = null;
  historial: ClimaData[] = [];
  
  cargando: boolean = false;
  errorMsg: string | null = null;

  constructor(private climaService: ClimaService) {}

  ngOnInit(): void {
    // Carga inicial automatica requerida
    this.buscarClima();
  }

  buscarClima(): void {
    if (!this.ciudadBusqueda.trim()) return;

    this.cargando = true;
    this.errorMsg = null;

    this.climaService.getClima(this.ciudadBusqueda).subscribe({
      next: (data) => {
        this.climaActual = data;
        this.historial = this.climaService.getHistorial(); // Sincronizamos el historial
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'No se encontró la localidad o hubo un problema con la API.';
        this.cargando = false;
      }
    });
  }

  // Función explícita para el botón de actualizar manualmente
  actualizarClima(): void {
    if (this.climaActual) {
      this.ciudadBusqueda = this.climaActual.localidad;
      this.buscarClima();
    }
  }

  // Cargar una búsqueda del historial al hacerle clic
  seleccionarDelHistorial(item: ClimaData): void {
    this.ciudadBusqueda = item.localidad;
    this.buscarClima();
  }
}
