import { Routes } from '@angular/router';
import { Pelicula } from './components/puntos/pelicula/pelicula';
import { Moneda } from './components/puntos/moneda/moneda';
import { Audio } from './components/puntos/audio/audio';
import { Autos } from './components/puntos/autos/autos';
import { Clima } from './components/puntos/clima/clima';

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
    },
    {
        path:"audio",
        component: Audio
    },
    {
        path:"autos",
        component: Autos
    },
    {
        path:"clima",
        component: Clima
    }
];
