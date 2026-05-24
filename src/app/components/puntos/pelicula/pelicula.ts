import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Peliculas } from '../../../models/peliculas';
import { PeliculaService } from '../../../services/pelicula-service';


@Component({
  selector: 'app-pelicula',
  imports: [CommonModule],
  templateUrl: './pelicula.html',
  styleUrl: './pelicula.css',
})
export class Pelicula implements OnInit {

  listaPeliculas: Peliculas[] = [];

  constructor(private peliculaService: PeliculaService) {}

  ngOnInit(): void {
    this.cargarPeliculas();
  }

  cargarPeliculas(): void {
    // Tipamos la respuesta HTTP con tu interfaz en plural
    this.peliculaService.getPeliculas().subscribe({
      next: (result: Peliculas[]) => {
        console.log('Datos de películas:', result); // Revisa en la consola si la propiedad es "descripcion"
        this.listaPeliculas = result; // Guardamos el array directo
      },
      error: (error) => {
        console.error('Error al cargar el catálogo de películas:', error);
      }
    });
  }
}