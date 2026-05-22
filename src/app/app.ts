import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Moneda } from "./components/puntos/moneda/moneda";
import { Header } from './components/layout/header/header';

@Component({
  selector: 'app-root',
  imports: [Header,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tp-webservice-3218');
}
