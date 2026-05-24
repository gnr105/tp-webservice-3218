import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pelicula } from './components/pelicula/pelicula';


@Component({
  selector: 'app-root',
  imports: [Pelicula],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tp-webservice-3218');
}
