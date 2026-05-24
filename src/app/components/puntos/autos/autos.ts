import { Component, OnInit } from '@angular/core';
import { Auto } from '../../../models/auto';
import { MarcaService } from '../../../services/marca-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Modelos } from '../../../models/modelos';
import { ClimaService } from '../../../services/clima-service';
import { ClimaData } from '../../../models/clima-data';

@Component({
  selector: 'app-autos',
  imports: [CommonModule],
  templateUrl: './autos.html',
  styleUrl: './autos.css',
})
export class Autos implements OnInit {
  listaMarcas: Auto[] = [];
  listaModelos: Modelos[] = [];
  marcaSeleccionada: Auto | null = null;
  datosClima: ClimaData | null = null;
  
  cargandoMarcas: boolean = false;
  cargandoModelos: boolean = false;
  errorMsg: string | null = null;

  constructor(private marcaService: MarcaService, private climaService: ClimaService) {}

  ngOnInit(): void {
    this.cargarMarcas();
    this.cargarClima();
  }

  cargarClima(): void {
    this.climaService.getClima('San Salvador de Jujuy').subscribe({
      next: (data) => {
        this.datosClima = data;
      },
      error: (err) => {
        console.error('Error al cargar clima en Autos:', err);
      }
    });
  }

  cargarMarcas(): void {
    this.cargandoMarcas = true;
    this.marcaService.getMarcas().subscribe({
      next: (data) => {
        this.listaMarcas = data;
        this.cargandoMarcas = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'No se pudieron cargar las marcas del servidor.';
        this.cargandoMarcas = false;
      }
    });
  }

  seleccionarMarca(marca: Auto): void {
    this.marcaSeleccionada = marca;
    this.listaModelos = [];
    this.cargandoModelos = true;

    this.marcaService.getModelosPorMarca(marca.id).subscribe({
      next: (modelos) => {
        this.listaModelos = modelos;
        this.cargandoModelos = false;
      },
      error: (err) => {
        console.error(err);
        this.cargandoModelos = false;
      }
    });
  }
}
