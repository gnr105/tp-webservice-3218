import { Routes } from '@angular/router';
import { Pelicula } from './components/puntos/pelicula/pelicula';
import { Moneda } from './components/puntos/moneda/moneda';

export const routes: Routes = [
    {
        path:"",
        redirectTo:"/moneda",
        pathMatch:"full"
    },
    {
        path:"moneda",
        component: Moneda
    },
    {
        path:"pelicula",
        component: Pelicula
    }
];
