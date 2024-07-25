import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'map', component: MapComponent},
];
