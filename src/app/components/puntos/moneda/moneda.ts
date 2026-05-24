import { Component, OnInit } from '@angular/core';
import { MonedaService } from '../../../services/moneda-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-moneda',
  imports: [FormsModule, CommonModule],
  templateUrl: './moneda.html',
  styleUrl: './moneda.css',
})
export class Moneda implements OnInit{
  cantidad: number = 0;
  monedaOrigen: string = '';
  monedaDestino: string = '';
  resultado: string = '';

 listaMonedas: { codigo: string, nombre: string }[] = [];

  constructor(private monedaService: MonedaService){

  }

  ngOnInit(): void {
    this.cargarMonedas();
  }

  cargarMonedas(): void {
    this.monedaService.getCurrencies().subscribe({
      next: (data) => {
        if (data && data.currencies) {
          // Convertimos el objeto en un array estructurado
          this.listaMonedas = Object.entries(data.currencies).map(([codigo, nombre]) => ({
            codigo: codigo, // Ej: "ARS"
            nombre: nombre as string // Ej: "Argentine Peso"
          }));
        }
      },
      error: (err) => console.error(err)
    });
  }
  ejecutarConversion():void{
    if (!this.monedaOrigen || !this.monedaDestino || !this.cantidad){
      this.resultado = 'Por  favor, completa todos los campos';
      return;
    }
    this.monedaService.convert(this.monedaOrigen, this.monedaDestino, this.cantidad).subscribe({
      next: (data) => {
        if(data && data.result!== undefined){
          this.resultado = `${data.result.toFixed(2)} ${this.monedaDestino}`;
        }
      },
      error: (err) => {
        console.error('Error en la conversión:', err);
        this.resultado = 'Error al procesar la conversión.';
      }
    });
  }
}
