import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    {path: 'about', component: AboutComponent},
{path: 'map', component: MapComponent},
];
