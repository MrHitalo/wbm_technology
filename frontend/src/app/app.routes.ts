import { Routes } from '@angular/router';
import { PainelComponent } from './pages/painel/painel.component';
import { EsferaComponent } from './pages/equipamento/esfera/esfera.component';
import { GavetaComponent } from './pages/equipamento/gaveta/gaveta.component';
import { ArComponent } from './pages/equipamento/ar/ar.component';

export const routes: Routes = [
    {
        path: '',
        component: PainelComponent
    },
    {
        path: 'equipamento/esfera',
        component: EsferaComponent
    },
    {
        path: 'equipamento/gaveta',
        component: GavetaComponent
    },
    {
        path: 'equipamento/ar',
        component: ArComponent
    },
    {
        path: '**',
        redirectTo: '' // Redireciona para o painel em caso de rota inválida
    }
];
